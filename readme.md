# takcast.mediafile

# 作者

taktod

https://twitter.com/taktod

poepoemix@hotmail.com

# 概要

electronで作ってみる配信ツールのtakcastの動画や音声ファイルを扱うためのsource plugin

# 使い方

takcastのプロジェクトで

```
$ npm install taktod/takcast.mediafile
```

これで使えるようにする予定
現状では、takcast側のソースの修正が必要になるので、本体側参照してください

# takcastとは

electronをつかって作ってみる、映像や音声を合成して配信するツール。
元ネタは、勤めてる会社にopenGLでの映像合成の有用性を示すために作ったプログラム
せっかくなので公開してみようと思っています。

# 構成

## node/index.ts

node側処理用のpluginエントリー
今回は利用しないので、適当につくってます。

## render/index.ts

render側処理用のpluginエントリー
sourceを提供する動作となってます。

## render/ui/pickupComponent.tsx

新規sourceを選択するときに利用するui動作
ファイルを選択して準備する

## render/source.ts

作成し提供するsourceオブジェクト

## render/ui/paletteComponent.tsx

sourceオブジェクトをパレットパネルに表示するui動作の定義
