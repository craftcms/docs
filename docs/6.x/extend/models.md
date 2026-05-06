# Models, Records, and Data

Craft 6.x adopts Laravel’s definition of a model, which is part of its database abstraction, the [Eloquent ORM](laravel:eloquent).
This means that there are some conceptual shifts for both models and records.

## Database Records

Many objects that were *records* in Craft 5.x are now Eloquent models, and extend `CraftCms\Cms\Shared\BaseModel`.
This implementation provides some familiar features, like standardized `dateCreated`, `dateUpdated`, and `dateDeleted` columns.
UIDs are optional, and come from `CraftCms\Cms\Shared\Concerns\HasUid`.

Models are only concerned with the shape of data in the database—they no longer define methods or properties, use validation rules, emit events, etc.
We still use service-like classes to translate data objects to Eloquent models, for saving.

This separation is _not_ required, for plugins; you are free to use `BaseModel` for anything that must be persisted in the database, while also implementing validation traits and interfaces!

## Data Objects

Most subclasses of `craft\base\Model` now extend `CraftCms\Cms\Component\Component`.
Components retain a lot of familiar features, like mass-assignment via constructors, automatic typecasting, [validation](validation.md), array access, behavior-like [macros](macros.md), and so on.

You can also opt in to some component features, piecemeal:

- `CraftCms\Cms\Validation\Contracts\Validatable` and `CraftCms\Cms\Validation\Concerns\Validates` together provide a full suite of [validation](validation.md) tools;
- The `#[\CraftCms\Cms\Validation\Ruleset()]` attribute lets you share sets of validation rules between objects;
- Any class can be safely “configured” (in its constructor, or from outside) using `CraftCms\Cms\Support\Typecast::configure()`;

<Block label="DTOs and Plain Arrays">

A big reason why we were able to pare down our own model implementations to generic “data transfer objects” has to do with Laravel’s validation engine, and our ability to validate data as it enters the system, rather than after it’s assigned to an object.

In many situations, this ends up meaning that we can completely eliminate small, data-only models.

</Block>

<See path="validation.md" />
