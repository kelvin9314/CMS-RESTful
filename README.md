This is a prototype of library website for MicroProgram
Start from 2019/03/29

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 0. 遵守 Git Flow

```
Master：主要是用來放穩定、隨時可上線的版本。這個分支的來源只能從別的分支合併過來，開發者不會直接 Commit 到這個分支。因為是穩定版本，所以通常也會在這個分支上的 Commit 上打上版本號標籤。

Develop：這個分支主要是所有開發的基礎分支，當要新增功能的時候，所有的 Feature 分支都是從這個分支切出去的。而 Feature 分支的功能完成後，也都會合併回來這個分支。

Feature：當要開始新增功能的時候，就是使用 Feature 分支的時候了。Feature 分支都是從 Develop 分支來的，完成之後會再併回 Develop 分支。

```

## 1. 開發需求

### 管理者角色頁面

- 查詢 : 顯示圖書的庫存量 , 借出記錄 , 目前借出的人
- 新增 : 新增圖書
- Edit : e.g. 修改同一本圖書的庫存量 , 圖書資料修正

### 使用者角色頁面

- 查詢 : 查詢圖書可借用的庫存量 (不會顯示目前借出的人)
- 預約 :
- 借書 : 需填寫 { 書籍編號 ,書名 ,借用日期 ,借閱人 ,分機}
- 還書

### 資料

- 預計使用 json 檔文件去儲存圖書資料 和 借出記錄

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

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
