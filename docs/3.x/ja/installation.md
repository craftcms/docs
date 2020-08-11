# インストールガイド

## ステップ 1：Craft のダウンロード

Craft は [Composer](#downloading-with-composer) でダウンロードするか、zip または tar.gz アーカイブを[手動でダウンロード](#downloading-an-archive-file-manually)できます。最終的な結果は同じになるため、あなたにとってより快適な方法を選んでください。

### Composer でダウンロード

::: tip
Composer 1.3.0 以降を稼働させるべきです。起動しているターミナル上で `composer -V` を実行することによって、インストールされている Composer のバージョンを確認できます。1.3.0 より前のバージョンであれば、Composer をアップデートするために `composer self-update` を実行します。
:::

新しい Craft プロジェクトを作成するため、次のコマンドを実行してください。（Composer が作成するプロジェクトのパスの代わりに`<Path>` と記載しています。）

```bash
composer create-project craftcms/craft <Path>
```

Composer がすべてをロードするのに、数分かかるでしょう。完了すると、成功メッセージが表示されます。

![Composer で Craft をロード後に表示される成功メッセージ](./images/installation-command-line.png)

### アーカイブファイルを手動でダウンロード

作業に適したアーカイブ形式をダウンロードします。

- **zip**: [3.3.20.1](https://download.craftcdn.com/craft/3.3/Craft-3.3.20.1.zip), [latest](https://craftcms.com/latest-v3.zip)
- **tar.gz**: [3.3.20.1](https://download.craftcdn.com/craft/3.3/Craft-3.3.20.1.tar.gz), [latest](https://craftcms.com/latest-v3.tar.gz)

新しい Craft プロジェクトを稼働したい場所でアーカイブを展開します。

::: tip
macOS を使用している場合、そこにある不可視ファイル（`.env`、`.env.example`、`.gitignore`、および、`web/.htaccess`）を失わないよう注意してください。Finder で <kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd> を押すことで、不可視ファイルの表示を切り替えることができます。
:::

### ディレクトリ構造

Craft のファイルが適切な場所にあれば、プロジェクトディレクトリは次のようなディレクトリ構造になっているはずです。

```
my-project.test/
├── config/
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
├── craft
└── craft.bat
```

::: tip
これらすべてのフォルダやファイルが何のためにあり、どのようにカスタマイズするかを知りたければ、[Directory Structure](directory-structure.md) ページを参照してください。
:::

::: tip
Craft のダウンロードに Composer を利用した場合、おそらく安全にこのステップをスキップできます。
:::

## ステップ 2：ファイルパーミッションの設定

Craft が正しく動作するためには、PHP が次の場所への書き込み権限が必要です。

設定されるべき正確なパーミッションは、PHP を実行しているシステムユーザーと実際にフォルダやファイルを所有しているユーザーとの関係性に依存します。

- `.env`
- `composer.json`
- `composer.lock`
- `config/license.key`
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
Craft のダウンロードに Composer を利用した場合、おそらく安全にこのステップをスキップできます。
:::

## ステップ 3：セキュリティキーの設定

それぞれの Craft プロジェクトでは、そのプロジェクトがインストールされている各環境で共有されるユニークなセキュリティキーが必要です。

[手動](#set-the-key-manually)でキーの生成と割り当てを行うか、[ターミナルコマンド](#set-the-key-from-your-terminal)で Craft に任せることもできます。

はじめに、なるべく [1Password](https://1password.com) のようなパスワードジェネレーターを使って、暗号化された安全なキーを生成してください。（長さに制限はありません。）

### キーを手動で設定

そして、（macOS であれば、[Transmit](https://panic.com/transmit/) のようなアプリを利用して）`.env` ファイルを開き、次の行を探してください。

ダブルクォートの内側にセキュリティキーをペーストし、ファイルを保存します。

    SECURITY_KEY=""

ターミナル上でプロジェクトのルートディレクトリへ移動し、次のコマンドを実行します。

### キーをターミナルから設定

次に、Craft プロジェクト向けのデータベースを作成する必要があります。Craft 3 は MySQL 5.5 以上と PostgreSQL 9.5 以上の両方をサポートします。

```bash
php craft setup/security-key
```

## ステップ 4：データベースの作成

選択可能であれば、ほとんどの場合に次のデータベース設定を推奨します。

Craft プロジェクトをホストするための新しいウェブサーバーを用意してください。ドキュメントルートは `web/` ディレクトリ（または、リネームしたディレクトリ）を指すようにします。

- **MySQL**
  - デフォルトの文字セット： `utf8`
  - デフォルトの照合順： `utf8_unicode_ci`

- **PostgreSQL**
  - 文字セット： `UTF8`

## ステップ 5：ウェブサーバーのセットアップ

[MAMP](https://mamp.info) や他のローカルホスティングツールを使用していない場合、`hosts` ファイルを更新して、選択したホスト名にローカルコンピュータへ要求をルーティングする必要があるかもしれません。

ブラウザで `http://<Hostname>/index.php?p=admin/install`（ウェブサーバーのホスト名で `<Hostname>` を置き換える）にアクセスすることで、すべて正しく設定できたかどうかをテストできます。Craft のセットアップウィザードが表示された場合、そのホスト名は Craft のインストールのために適切に処理されています。

- **macOS/Linux/Unix**: `/etc/hosts`
- **Windows**: `\Windows\System32\drivers\etc\hosts`

ついに、Craft のセットアップウィザードを実行するときがきました。[ターミナル](#terminal-setup) または [ウェブブラウザ](#web-browser-setup) から実行できます。

## ステップ 6：セットアップウィザードの実行

ターミナル上でプロジェクトのルートディレクトリに移動し、次のコマンドを実行してセットアップウィザードを開始します。

### ターミナルによるセットアップ

このコマンドは、データベースへの接続方法を学んだ上で Craft のインストーラーを開始するために、いくつかの質問をします。それが終われば、ウェブブラウザから新しい Craft サイトにアクセスできるはずです。

```bash
php craft setup
```

ウェブブラウザで `http://<Hostname>/index.php?p=admin/install`（ウェブサーバーのホスト名で `<Hostname>` を置き換える）に移動します。ここまでのステップがうまくいっていれば、Craft のセットアップウィザードが迎えてくれるでしょう。

### ウェブブラウザによるセットアップ

In your web browser, go to `http://<Hostname>/index.php?p=admin/install` (substituting `<Hostname>` with your web server’s host name). If you’ve done everything right so far, you should be greeted by Craft’s Setup Wizard.

![Craft Installation Screen](./images/installation-step-0.png)

The first step of the installer is to accept the [license agreement](https://craftcms.com/license). Scroll down through the agreement (reading it all, of course) and click the “Got it” button to accept.

![Craft Installation License Agreement](./images/installation-step-1.png)

::: tip
Craft がすでにデータベースに接続可能な状態であれば、このステップはスキップされます。
:::

::: tip
If the Setup Wizard skips this step, it’s because Craft is already able to connect to your database.
:::

![Craft Installation Database Connection Information](./images/installation-step-2.png)

The third step of the installer is to create an admin account. Don’t be one of _those people_ and be sure to pick a strong password.

![Craft Installation Create User Account](./images/installation-step-3.png)

The final step is to define your System Name, Base URL, and Language.

![Craft Installation System Settings](./images/installation-step-4.png)

インストールが成功したら、Craft はブラウザをコントロールパネルにリダイレクトします。

If it was successful, Craft will redirect your browser to the Control Panel.

![Craft Installation Complete](./images/installation-step-5.png)

さぁ、素晴らしいものを築きあげましょう。

Now build something incredible.
