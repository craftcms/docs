# Testing

## Types of Tests

There are a variety of tests, each providing pros and cons to specific use cases and functionalities within your application/module/plugin. Craft currently supports the following four test types.

### Manual Testing

Everyone that’s worked with Craft has done manual testing. Manual testing consists of the following steps:

1. Write some code.
2. Refresh a given page or trigger a controller action.
3. Verify the result in the browser, IDE, or database.

Manual testing is often the most effective way to catch bugs in the _primary_ implementation of code. However, each test takes a significant amount of time and fails in certain key areas. Most importantly, if you make a change to a codebase in one place it may fail in other places you’re _not_ manually testing.

It would be woefully inefficient to test your **entire** application manually after each `git push`. This is where **automated** tests can help.

::: tip
Testing is all about strategy and approaches. Manual testing and automated testing work best together. You can use your judgement to detect/prevent issues that computers cannot see whilst computers can execute many tests in short time.
:::

### Unit Testing

Many definitions exist regarding unit testing. Fundamentally a unit test is focused on testing an individual “unit” of your code. This often means testing the results of a function or class.

Consider the following class:

```php
class SalaryChecker
{
    public function multiply(int $a, int $b) : int
    {
        return $a * $b;
    }

    public function add(int $a, int $b) : int
    {
        return $a + $b;
    }
}
```

Your unit test for this class might look like this:

```php
use Codeception\Test\Unit;

class MyTest extends Unit
{
    public $salaryChecker;

    /**
     * This `_before()` hook is run before *every* test. We use it here
     * to create a new `SalaryChecker()` instance each test can call.
     */
    public function _before()
    {
        parent::_before();

        $this->salaryChecker = new SalaryChecker();
    }

    /**
     * Each `test*` function is executed, and within it we write a test
     * that calls one of SalaryChecker’s methods to make an assertion
     * about the result that should be returned.
     *
     * In this test, `multiply()` should multiply the parameters and
     * return the result, so we provide `2` and `2` and know the result
     * should be `4`.
     */
    public function testMultiply()
    {
        $this->assertSame(
            4,
            $this->salaryChecker->multiply(2, 2)
        );
    }

    /**
     * SalaryChecker’s `add()` method should add the parameters, so we
     * can safely assert that `2` and `1` should return `3`.
     */
    public function testAdd()
    {
        $this->assertSame(
            3,
            $this->salaryChecker->add(2, 1)
        );
    }
}
```

This is a fundamental unit test.

Now imagine a developer was to change `SalaryChecker` so its `multiply()` method never returned a number lower than `25000`:

```php
public function multiply(int $a, int $b) : int
{
    $result = $a * $b;

    // Don’t return salaries lower than 25,000
    if ($result < 25000) {
        return 25000
    }

    return $result;
}
```

The test would fail, expecting a result of `4` and getting `25000` instead.

Even though this is a basic example, it would automatically confirm expected application behavior and issue a warning signal if the tested behavior changed. This can be increasingly important as a codebase grows, changes hands as developers join or leave the project, or requirements differ from the original spec.

Good unit tests ensure your individual functions work correctly, and help you quickly catch and fix bugs if they don’t.

Your unit tests will primarily cover your [service](../extend/services.md) classes. It’s probably excessive to test _every_ method of your service class; you’ll need to use your judgement and test methods as high up in the [call stack/backtrace](https://www.php.net/manual/en/function.debug-backtrace.php) as possible. (This excludes your controllers, which are covered by functional and acceptance testing).

::: tip
For more practical examples, see the [Codeception documentation on unit tests](https://codeception.com/docs/05-UnitTests).
:::

### Functional & Acceptance Testing

Your application isn’t just a collection of PHP classes on a server; these classes work together to create an end product. These methods are often linked via controllers. The end product will then be shipped to a user via these controllers. The controller actions are the place where your application functionality is encompassed into a usable package, making them an ideal place to test.

Typically a controller will:

1. Process a request (authentication, authorization, request types etc.)
2. Invoke craft services.
3. Return a response.

Point 2 is covered by unit tests. 1 and 3 are covered by functional and acceptance tests.

What separates functional and acceptance tests from unit tests are that they’re conducted from the **user** perspective. Consider the following Twig template located at route `/pages/bob`:

```twig
Hi {{ currentUser.firstName }},

Welcome to this app!
```

A functional test tor this page/template might look like this:

```php
use FunctionalTester;

class FunctionalCest
{
    public function testWelcomeMessage(FunctionalTester $I)
    {
        $I->amLoggedInAs($userWithFirstNameBob);
        $I->amOnPage('/pages/bob');
        $I->see('Hi Bob,');
        $I->see('Welcome to this app!');
    }
}
```

Don’t worry about `$userWithFirstNameBob`. Just pretend that this variable is an instance of `craft\elements\User` where `$firstName = "bob"`.

Notice how the test reads like instructions that you _could_ give to a human to perform on a production version of your application.

Underneath, the functional test actually triggers the controller associated with this route. If you have a module or plugin you can also pass in, for example, `?p=actions/my-plugin/my-controller/my-action` which will test your controller actions.

You can even test control panel functionality by passing a URL that starts with the [cpTrigger](../config/config-settings.md#cptrigger) config (i.e. with a `cpTrigger` of `admin` you could do `$I->amOnRoute('/admin/my-plugin/my-route/my-action)`).

::: tip
Acceptance and functional tests are similar with subtle differences in their _implementation_. See the [Codeception docs](https://codeception.com/docs/01-Introduction) for an explanation.
:::
