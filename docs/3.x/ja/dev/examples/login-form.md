# ログインフォーム

サイトのフロントエンドからユーザーのログインが必要な場合、次のコードで実現できます。

```twig
<form method="post" accept-charset="UTF-8">
    {{ csrfInput() }}
    {{ actionInput('users/login') }}

    <label for="loginName">Username or email</label>
    <input id="loginName" type="text" name="loginName"
        value="{{ craft.app.user.rememberedUsername }}">

    <label for="password">Password</label>
    <input id="password" type="password" name="password">

    <label>
        <input type="checkbox" name="rememberMe" value="1">
        Remember me
    </label>

    <input type="submit" value="Login">

    {% if errorMessage is defined %}
        <p>{{ errorMessage }}</p>
    {% endif %}
</form>

<p><a href="{{ url('forgotpassword') }}">Forgot your password?</a></p>
```

`craft.session.returnUrl` には、このログインフォームへリダイレクトした `{% requireLogin %}` タグを含む元の URL がセットされます。

デフォルトでは、ユーザーがログイン後にコンフィグ設定 `postLoginRedirect` の値に基づきリダイレクトされます。 `redirect` パラメータを利用して、ログインフォーム内で設定を上書きすることもできます。

```twig
{{ redirectInput('some/custom/path') }}
```

