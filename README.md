Content Management System

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 0. 遵守 Git Flow

```
Master：主要是用來放穩定、隨時可上線的版本。這個分支的來源只能從別的分支合併過來，開發者不會直接 Commit 到這個分支。因為是穩定版本，所以通常也會在這個分支上的 Commit 上打上版本號標籤。

Develop：這個分支主要是所有開發的基礎分支，當要新增功能的時候，所有的 Feature 分支都是從這個分支切出去的。而 Feature 分支的功能完成後，也都會合併回來這個分支。

Feature：當要開始新增功能的時候，就是使用 Feature 分支的時候了。Feature 分支都是從 Develop 分支來的，完成之後會再併回 Develop 分支。

```

## 1. 開發需求

### Ref

- [ Prototype ](https://marvelapp.com/6bee4jb)
- [ UI Flow (文字版) ](https://drive.google.com/file/d/1O2AJbTUGa-cQ69ZW81ZSbT1I-6oF0ADt/view)
- [ UI Flow (畫面版) ](https://drive.google.com/file/u/3/d/1kQ69cyPKbTSK09hn-SU555YzvtD2HXfi/view?usp=sharing)
- [ 操作流程 ](https://drive.google.com/file/d/1h24N8Om6_YDn9H4_LU-vieTVjKHLJH1q/view)
- [ 6F 圖書館書籍清單 ](https://docs.google.com/spreadsheets/d/1TiOETJcC9dYUQ8N1PoEI6h9_oV_9c3IfY2JpwSOh4CQ/edit#gid=1047697510)
- [LS 功能規格](https://docs.google.com/spreadsheets/d/1umZqkwiHQggaj39Dh7Bz9-kRSv0wSf4Dj-6LbatCAC4/edit#gid=1900301281)

### 管理者角色頁面

- 查詢 : 顯示圖書的庫存量 , 借出記錄 , 目前借出的人
- 新增 : 新增圖書
- Edit : e.g. 修改同一本圖書的庫存量 , 圖書資料修正

### 資料

- 預計使用 mongoDB 去儲存圖書資料 和 借出記錄
  with : mLab Clould ?

- 圖書 Columns
  {書名,作者,ISBN,書籍編號,分類 ,出版年份, etc}

- 分類:
  1.UCD , 產品,策略設計/脈絡思維類
  2.DEV , 自我成長 / 心靈雞湯類
  3.MNG , 管理/行銷/理財類
  4.ENT , 休閒娛樂類
  5.COD , 程式開發/技術類
  6.MAG , 雜誌類

- 每本書借用期限: 1 個月

## 框架＆套件

- antd

### App 使用者角色頁面

- 查詢 : 查詢圖書可借用的庫存量 (不會顯示目前借出的人)
- 預約 :
- 借書 : 需填寫 { 書籍編號 ,書名 ,借用日期 ,借閱人 ,分機}
- 還書

## Available Scripts

### Before :

you need to run:

- npm before-env
- npm install

In the project directory, you can run:

### `npm start`

### `npm test`

### `npm run build`
