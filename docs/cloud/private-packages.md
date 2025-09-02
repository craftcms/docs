# Private Packages

Craft Cloud supports private Composer packages with all the native authentication methods.

::: tip
Read about Composer’s authentication system in the [official documentation](https://getcomposer.org/doc/articles/authentication-for-private-packages.md).
:::

When you deploy a site that requires private packages, Cloud will use credentials provided via the project’s **Settings** → **Composer Auth** screen.

Once you’ve added a username, password, or token, it cannot be retrieved—the values are only decrypted in our build pipeline when installing dependencies.

## Auth Methods

We currently support the following [authentication methods](https://getcomposer.org/doc/articles/authentication-for-private-packages.md#authentication-methods):

- GitHub Token
- HTTP Basic
- Gitlab Token
- Gitlab OAuth
- Bitbucket OAuth
- HTTP Bearer
