# インストールガイド

## ステップ 1：Craft のダウンロード

Craft は [Composer](#downloading-with-composer) でダウンロードするか、zip または tar.gz アーカイブを[手動でダウンロード](#downloading-an-archive-file-manually)できます。 最終的な結果は同じになるため、あなたにとってより快適な方法を選んでください。

### Composer でダウンロード

::: tip
Composer 1.3.0 以降を稼働させるべきです。 起動しているターミナル上で `composer -V` を実行することによって、インストールされている Composer のバージョンを確認できます。 1.3.0 より前のバージョンであれば、Composer をアップデートするために `composer self-update` を実行します。
:::

新しい Craft プロジェクトを作成するため、次のコマンドを実行してください。 （Composer が作成するプロジェクトのパスの代わりに`<Path>` と記載しています。 ）

```bash
composer create-project craftcms/craft <Path>
```

Composer がすべてをロードするのに、数分かかるでしょう。 完了すると、成功メッセージが表示されます。

![Composer で Craft をロード後に表示される成功メッセージ](./images/installation-command-line.png)

### アーカイブファイルを手動でダウンロード

作業に適したアーカイブ形式をダウンロードします。

- [zip](https://craftcms.com/latest-v3.zip)
- [tar.gz](https://craftcms.com/latest-v3.tar.gz)

新しい Craft プロジェクトを稼働したい場所でアーカイブを展開します。

::: tip
macOS を使用している場合、そこにある不可視ファイル（`.env`、`.env.example`、`.gitignore`、および、`web/.htaccess`）を失わないよう注意してください。 Finder で <kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd> を押すことで、不可視ファイルの表示を切り替えることができます。
:::

### ディレクトリ構造

Craft のファイルが適切な場所にあれば、プロジェクトディレクトリは次のようなディレクトリ構造になっているはずです。

```treeview
my-project.test/
├── config/
│   └── ...
├── modules/
│   └── ...
├── storage/
│   └── ...
├── templates/
│   └── ...
├── vendor/
│   └── ...
├── web/
│   └── ...
├── .env
├── .env.example
├── .gitignore
├── composer.json
├── composer.lock
└── craft
```

::: tip
The `web/` folder represents your site’s web root, and it can be renamed to whatever you want (`www/`, `public/`, `public_html/`, etc.).
:::

::: tip
Craft のダウンロードに Composer を利用した場合、おそらく安全にこのステップをスキップできます。
:::

## ステップ 2：ファイルパーミッションの設定

::: tip
Craft のダウンロードに Composer を利用した場合、おそらく安全にこのステップをスキップできます。 :::
:::

設定されるべき正確なパーミッションは、PHP を実行しているシステムユーザーと実際にフォルダやファイルを所有しているユーザーとの関係性に依存します。

- `.env`
- `composer.json`
- `composer.lock`
- `config/license.key`
- `config/project/*`
- `storage/*`
- `vendor/*`
- `web/cpresources/*`

::: warning
IS ファンへ サイトの AppPool アカウントがこれらのフォルダやファイルに書き込み権限を持っていることを確認してください。
:::

- 同じユーザーであれば、`744` を利用します。
- 同じグループであれば、`774` を利用します。
- 確信が持てず、緊張感がある生活を好むなら、`777` を利用します。

::: tip
If the Setup Wizard skips this step, it’s because Craft is already able to connect to your database.
:::

## ステップ 3：セキュリティキーの設定

::: tip
Craft のダウンロードに Composer を利用した場合、おそらく安全にこのステップをスキップできます。
:::

[手動](#set-the-key-manually)でキーの生成と割り当てを行うか、[ターミナルコマンド](#set-the-key-from-your-terminal)で Craft に任せることもできます。

You can generate and assign the key [manually](#set-the-key-manually), or have Craft do it for you with a [terminal command](#set-the-key-from-your-terminal).

### キーを手動で設定

First generate a cryptographically secure key, preferably using a password generator like [1Password](https://1password.com/password-generator/). （長さに制限はありません。 ）

ダブルクォートの内側にセキュリティキーをペーストし、ファイルを保存します。

    SECURITY_KEY=""

ターミナル上でプロジェクトのルートディレクトリへ移動し、次のコマンドを実行します。

### キーをターミナルから設定

ターミナル上でプロジェクトのルートディレクトリに移動し、次のコマンドを実行してセットアップウィザードを開始します。

```bash
php craft setup/security-key
```

## ステップ 4：データベースの作成

次に、Craft プロジェクト向けのデータベースを作成する必要があります。 Craft 3 は MySQL 5.5 以上と PostgreSQL 9.5 以上の両方をサポートします。

選択可能であれば、ほとんどの場合に次のデータベース設定を推奨します。

- **MySQL**
  - デフォルトの文字セット： `utf8`
  - デフォルトの照合順： `utf8_unicode_ci`

- **PostgreSQL**
  - 文字セット： `UTF8`

## ステップ 5：ウェブサーバーのセットアップ

Craft プロジェクトをホストするための新しいウェブサーバーを用意してください。 Its document root (or “web root”) should point to your `web/` directory (or whatever you’ve renamed it to).

[MAMP](https://mamp.info) や他のローカルホスティングツールを使用していない場合、`hosts` ファイルを更新して、選択したホスト名にローカルコンピュータへ要求をルーティングする必要があるかもしれません。

- **macOS/Linux/Unix**: `/etc/hosts`
- **Windows**: `\Windows\System32\drivers\etc\hosts`

ブラウザで `http://<Hostname>/index.php?p=admin/install`（ウェブサーバーのホスト名で `<Hostname>` を置き換える）にアクセスすることで、すべて正しく設定できたかどうかをテストできます。 Craft のセットアップウィザードが表示された場合、そのホスト名は Craft のインストールのために適切に処理されています。

::: tip
We recommend using the `.test` TLD for local development, and specifically not `.local` on macOS since [conflicts with Bonjour can lead to performance issues](https://help.rm.com/technicalarticle.asp?cref=tec3015691).
:::

## ステップ 6：セットアップウィザードの実行

ついに、Craft のセットアップウィザードを実行するときがきました。 [ターミナル](#terminal-setup) または [ウェブブラウザ](#web-browser-setup) から実行できます。

### ターミナルによるセットアップ

In your terminal, go to your project’s root directory and run the following command to kick off the Setup Wizard:

```bash
php craft setup
```

このコマンドは、データベースへの接続方法を学んだ上で Craft のインストーラーを開始するために、いくつかの質問をします。 それが終われば、ウェブブラウザから新しい Craft サイトにアクセスできるはずです。

### ウェブブラウザによるセットアップ

In your web browser, go to `http://<Hostname>/index.php?p=admin/install` (substituting `<Hostname>` with your web server’s host name). If you’ve done everything right so far, you should be greeted by Craft’s Setup Wizard.

![Craft Installation Screen](./images/installation-step-0.png)

The first step of the installer is to accept the [license agreement](https://craftcms.com/license). Scroll down through the agreement (reading it all, of course) and click the “Got it” button to accept.

![Craft Installation License Agreement](./images/installation-step-1.png)

The second step is to enter your database connection information.

::: tip
Craft がすでにデータベースに接続可能な状態であれば、このステップはスキップされます。
:::

![Craft Installation Database Connection Information](./images/installation-step-2.png)

The third step of the installer is to create an admin account. Don’t be one of _those people_ and be sure to pick a strong password.

![Craft Installation Create User Account](./images/installation-step-3.png)

The final step is to define your System Name, Base URL, and Language.

![Craft Installation System Settings](./images/installation-step-4.png)

Click “Finish up” to complete the setup process. A few seconds later, you should have a working Craft install!

If it was successful, Craft will redirect your browser to the Control Panel.

![Craft Installation Complete](./images/installation-step-5.png)

インストールが成功したら、Craft はブラウザをコントロールパネルにリダイレクトします。

Now build something incredible.
