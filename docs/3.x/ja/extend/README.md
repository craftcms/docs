# Craft の拡張

Craft provides a complete toolkit for customizing its features and functionality; almost every aspect of Craft can be extended, hooked into, or completely replaced. PHP を知っているなら、あなたが望むものを構築することができます。

## モジュール 対 プラグイン

ほとんどのカスタマイズは、**モジュール**、または、**プラグイン**の形で行われます。

Yii のドキュメントに[記載されているように](https://www.yiiframework.com/doc/guide/2.0/en/structure-modules)、**モジュール**は _「モデル、ビュー、コントローラー、および、その他のサポートコンポーネントでできている、独立したソフトウェアユニット」_ です。 言い換えれば、モジュールはコアのシステムコードを変更することなく、様々な方法でシステムを拡張します。

Modules can be simple, serving a single purpose like providing a new [Dashboard widget type](widget-types.md), or they can be complex, introducing entirely new concepts to the system, like an ecommerce application.

**プラグイン**は、Craft 特有のコンセプトであるため、Yii のドキュメントにはそれに関する言及がありません。 それらはモジュールでできるすべてのこと（技術的には、プラグインも実際はモジュール _です_ 。 ）が可能で、一般に配布されるためのより良いことが含まれています。

- Craft のプラグインストアからインストール / 試用 / 購入することができます。
- インストール、アップデート、または、アンインストール時にデータベースを変更できます。
- コントロールパネルの「設定」セクション内に独自の設定ページを持てます。
- Composer コマンドを実行することなく、管理者によって有効 / 無効にすることができます。

構築したいものがこれらの特徴によって恩恵を受ける場合、プラグインにしてください。 そうでなければ、モジュールの方が良いかもしれません。
