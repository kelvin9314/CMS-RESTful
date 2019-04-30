export const BookList = [
  {
    Book: '0001', // 書籍編號 (自定義編碼，如果未來有ISBN碼就不用)
    isbn: '', // 書籍ISBN碼
    totalQuantity: 1, // 書籍數量
    availableQuantity: 1, // 書籍目前可借用數量
    title: '', // 書名  (如果未來有ISBN碼就不用)
    author: '', // 作者  (如果未來有ISBN碼就不用)
    yearOfPublication: '', // 出版年份
    status: '', // Free , Occupied or Disable
    genre: '', // UCD, DEV, MNG , ENT, COD, MAG (上架類別)
    currentBorrowerId: '', // FK && this data only visible by Admin
    donor: '', // 捐贈者
    remind: ''
  }
];

export const RentalRecord = [
  {
    rentalId: '', // PK
    startDate: Date(), // 借閱日期
    endDate: Date(), // 歸還日期
    bookId: '', // Fk
    borrower: '' // Fk
  }
];

export const User = [
  {
    employeeID: '', // 員工編號
    name: '', // 姓名
    email: '',
    password: '',
    isAdmin: Boolean
  }
];
