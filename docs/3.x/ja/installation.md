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

Composer will take a few minutes to load everything. Once it’s done you’ll see a success message:

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
├── composer.json
└── craft
```

::: tip
`web/` フォルダはウェブルートを表し、あなたが望むものにリネームできます（`www/`、 `public/`、`public_html/`など）。 :::
:::

See the [Directory Structure](directory-structure.md) page to learn what these folders and files are for and how you can customize them.

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

The exact permissions you should be setting depends on the relationship between the system user that runs PHP and whoever owns the folders and files.

- If they’re the same user, use `744`.
- If they’re in the same group, use `774`.
- If you’re not sure and enjoy life on the edge, use `777`.

::: warning HEY
IIS FANS Make sure your site’s AppPool account has write permissions to these folders and files.
:::

## ステップ 3：セキュリティキーの設定

::: tip
Craft のダウンロードに Composer を利用した場合、おそらく安全にこのステップをスキップできます。
:::

[手動](#set-the-key-manually)でキーの生成と割り当てを行うか、[ターミナルコマンド](#set-the-key-from-your-terminal)で Craft に任せることもできます。

[手動](#set-the-key-manually)でキーの生成と割り当てを行うか、[ターミナルコマンド](#set-the-key-from-your-terminal)で Craft に任せることもできます。

### キーを手動で設定

はじめに、なるべく [1Password](https://1password.com) のようなパスワードジェネレーターを使って、暗号化された安全なキーを生成してください。 （長さに制限はありません。 ）

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

Craft プロジェクトをホストするための新しいウェブサーバーを用意してください。 ドキュメントルートは `web/` ディレクトリ（または、リネームしたディレクトリ）を指すようにします。

If you’re not using [Nitro](/nitro/2.x/) or another local hosting tool, you’ll probably need to update your `hosts` file so your computer knows to route your chosen host name’s requests locally.

- **macOS/Linux/Unix**: `/etc/hosts`
- **Windows**: `\Windows\System32\drivers\etc\hosts`

ブラウザで `http://<Hostname>/index.php?p=admin/install`（ウェブサーバーのホスト名で `<Hostname>` を置き換える）にアクセスすることで、すべて正しく設定できたかどうかをテストできます。 Craft のセットアップウィザードが表示された場合、そのホスト名は Craft のインストールのために適切に処理されています。

::: tip
ローカル開発では `.test` TLD を使用することを推奨します。 [Bonjour との衝突はパフォーマンスの問題に繋がる可能性があるため](https://help.rm.com/technicalarticle.asp?cref=tec3015691)、特に macOS では `.local` を使用しないでください。 :::
:::

## ステップ 6：セットアップウィザードの実行

Finally, it’s time to run Craft’s Setup Wizard from either your [terminal](#terminal-setup) or your [web browser](#web-browser-setup).

::: tip
If you used `composer create-project` earlier and chose to continue setup there, you can head straight to `https://mysite.test/admin`.
:::

### ターミナルによるセットアップ

In your terminal, go to your project’s root directory and run the following command to kick off the Setup Wizard:

```bash
php craft setup
```

The command will ask you a few questions to learn how to connect to your database, and then kick off Craft’s installer. Once it’s done, you should be able to access your new Craft site from your web browser.

### ウェブブラウザによるセットアップ

In your web browser, go to `https://mysite.test/index.php?p=admin/install` (substituting `mysite.test` with your web server’s host name). If you’ve done everything right so far, you should be greeted by Craft’s Setup Wizard:

<BrowserShot url="https://mysite.test/admin/install" :link="false">
<img src="./images/installation-step-0.png" alt="Craft Installation Screen">
</BrowserShot>

インストーラーの最初のステップは、[ライセンス契約](https://craftcms.com/license)への同意です。 Scroll down through the agreement (reading it all, of course) and press **Got it** to accept:

<BrowserShot url="https://mysite.test/admin/install" :link="false">
<img src="./images/installation-step-1.png" alt="Craft Installation License Agreement">
</BrowserShot>

The second step is to enter your database connection information:

::: tip
If the Setup Wizard skips this step, it’s because Craft is already able to connect to your database.
:::

<BrowserShot url="https://mysite.test/admin/install" :link="false">
<img src="./images/installation-step-2.png" alt="Craft Installation Database Connection Information">
</BrowserShot>

The third step is to create an admin account. Don’t be one of _those people_—be sure to pick a strong password:

<BrowserShot url="https://mysite.test/admin/install" :link="false">
<img src="./images/installation-step-3.png" alt="Craft Installation Create User Account">
</BrowserShot>

The final step is to define your System Name, Base URL, and Language:

<BrowserShot url="https://mysite.test/admin/install" :link="false">
<img src="./images/installation-step-4.png" alt="Craft Installation System Settings">
</BrowserShot>

Press **Finish up** to complete the setup process. A few seconds later, you should have a working Craft install!

If it was successful, Craft will redirect your browser to the control panel:

<BrowserShot url="https://mysite.test/admin/dashboard" :link="false">
<img src="./images/installation-step-5.png" alt="Craft Installation Complete">
</BrowserShot>

Congratulations, you’ve installed Craft!

Now build something incredible.

## Troubleshooting

See the [Troubleshooting a Failed Craft Installation](https://craftcms.com/knowledge-base/troubleshooting-failed-installation) Knowledge Base article if something went wrong along the way.
