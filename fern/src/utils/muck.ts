import { Avatar, Comments, Email, Exit, GiftCard, Like, Location, OrderList, RecentVisits } from '@Components/icons';

export const BEST_SELLER: {
  count?: number;
  discountPrice?: number;
  postTime: number;
  discountRate?: number;
  offer?: boolean;
  text: string;
  realPrice: number;
  image: string;
  id: number;
  metaDescription: string;
}[] = [
  {
    discountPrice: 12000000,
    postTime: 2,
    discountRate: 5,
    offer: false,
    text: 'تلویزیون ال ای دی هوشمند اسنوا مدل SSD-50SA1560U سایز 50 اینچ',
    realPrice: 12500000,
    image: '/best-seller/2.png',
    id: 12,
    metaDescription: 'ghf',
  },
  {
    count: 6,
    discountPrice: 16400000,
    postTime: 2,
    discountRate: 10,
    offer: true,
    text: 'یخچال فریزر دوقلو سیلور مدل SR-103',
    realPrice: 17000000,
    image: '/best-seller/4.png',
    id: 12,
    metaDescription: 'ghf',
  },
  {
    postTime: 2,
    offer: false,
    text: '‏اجاق گاز سینجر مدل SG-Apple',
    realPrice: 5000000,
    image: '/best-seller/1.png',
    id: 12,
    metaDescription: 'ghf',
  },
  {
    postTime: 2,
    offer: false,
    text: 'یخچال فریزر فیلور مدل RPD-COL-013',
    realPrice: 2200000,
    image: '/best-seller/5.png',
    id: 12,
    metaDescription: 'ghf',
  },
  {
    count: 6,
    discountPrice: 22300000,
    postTime: 2,
    discountRate: 10,
    offer: true,
    text: 'کولر گازی ال جی مدل Next Fighting2 NF249SQ1 24000',
    realPrice: 26000000,
    image: '/best-seller/3.png',
    id: 12,
    metaDescription: 'ghf',
  },
  {
    postTime: 1,
    text: 'ساندبار جی بی ال مدل Bar 5.1',
    realPrice: 24910000,
    image: '/popular/4.png',
    id: 12,
    metaDescription: 'ghf',
  },
];

export const COOLING: {
  count?: number;
  discountPrice?: number;
  postTime: number;
  discountRate?: number;
  offer?: boolean;
  text: string;
  realPrice: number;
  image: string;
}[] = [
  {
    postTime: 2,
    text: 'کولر گازی هیوندای مدل 1232 Wt1',
    realPrice: 11150000,
    image: '/cooling/1.png',
  },
  {
    count: 6,
    discountPrice: 24277250,
    postTime: 2,
    discountRate: 5,
    offer: true,
    text: 'کولرگازی گرین مدل GWS-H30P1T1/R410',
    realPrice: 25555000,
    image: '/cooling/2.png',
  },
  {
    discountPrice: 9675000,
    postTime: 2,
    discountRate: 6,
    offer: true,
    text: 'کولر گازی سوزوکی سری تانوشی مدل 12H410',
    realPrice: 10275000,
    image: '/cooling/3.png',
  },
  {
    postTime: 1,
    text: 'کولر گازی جی پلاس مدل GAC-TM24JN1/GAC-TM24JU1',
    realPrice: 17580000,
    image: '/cooling/4.png',
  },
  {
    count: 1,
    postTime: 1,
    text: 'کولر گازی وست پوینت مدل WSM-18117.LHE',
    realPrice: 16550000,
    image: '/cooling/5.png',
  },
  {
    count: 6,
    discountPrice: 22300000,
    postTime: 2,
    discountRate: 10,
    offer: true,
    text: 'کولر گازی ال جی مدل Next Fighting2 NF249SQ1 24000',
    realPrice: 26000000,
    image: '/best-seller/3.png',
  },
];

export const POPULAR: {
  count?: number;
  discountPrice?: number;
  postTime: number;
  discountRate?: number;
  offer?: boolean;
  text: string;
  realPrice: number;
  image: string;
  id: number;
  metaDescription: string;
}[] = [
  {
    postTime: 2,
    text: 'ماشین لباسشویی ال جی مدلWM-K702NW ظرفیت 7 کیلوگرم',
    realPrice: 16670000,
    image: '/popular/1.png',
    id: 1,
    metaDescription: 'dd',
  },
  {
    count: 6,
    discountPrice: 33789000,
    postTime: 2,
    discountRate: 6,
    offer: true,
    text: 'ماشین لباسشویی ال جی مدل G840S ظرفیت 8 کیلوگرم',
    realPrice: 36100000,
    image: '/popular/2.png',
    id: 1,
    metaDescription: 'dd',
  },
  {
    discountPrice: 6195000,
    postTime: 2,
    discountRate: 4,
    offer: true,
    text: 'جاروبرقی بوش مدل BGL82030',
    realPrice: 6450000,
    image: '/popular/3.png',
    id: 1,
    metaDescription: 'dd',
  },
  {
    postTime: 1,
    text: 'ساندبار جی بی ال مدل Bar 5.1',
    realPrice: 24910000,
    image: '/popular/4.png',
    id: 1,
    metaDescription: 'dd',
  },
  {
    count: 1,
    postTime: 1,
    text: 'پکیج شوفاژ دیواری ناوین مدل دیلاکس 30',
    realPrice: 25650000,
    image: '/popular/5.png',
    id: 1,
    metaDescription: 'dd',
  },
  {
    discountPrice: 9675000,
    postTime: 2,
    discountRate: 6,
    offer: true,
    text: 'کولر گازی سوزوکی سری تانوشی مدل 12H410',
    realPrice: 10275000,
    image: '/cooling/3.png',
    id: 1,
    metaDescription: 'dd',
  },
  {
    postTime: 1,
    text: 'کولر گازی جی پلاس مدل GAC-TM24JN1/GAC-TM24JU1',
    realPrice: 17580000,
    image: '/cooling/4.png',
    id: 1,
    metaDescription: 'dd',
  },
  {
    count: 1,
    postTime: 1,
    text: 'کولر گازی وست پوینت مدل WSM-18117.LHE',
    realPrice: 16550000,
    image: '/cooling/5.png',
    id: 1,
    metaDescription: 'dd',
  },
];

export const OFFERED: {
  count?: number;
  discountPrice: number;
  postTime: number;
  discountRate: number;
  offer: boolean;
  text: string;
  realPrice: number;
  image: string;
  id: number;
  metaDescription: string;
}[] = [
  {
    discountPrice: 9675000,
    postTime: 2,
    discountRate: 6,
    offer: true,
    text: 'کولر گازی سوزوکی سری تانوشی مدل 12H410',
    realPrice: 10275000,
    image: '/cooling/3.png',
    id: 12,
    metaDescription: 'gf',
  },
  {
    count: 6,
    discountPrice: 33789000,
    postTime: 2,
    discountRate: 6,
    offer: true,
    text: 'ماشین لباسشویی ال جی مدل G840S ظرفیت 8 کیلوگرم',
    realPrice: 36100000,
    image: '/popular/2.png',
    id: 12,
    metaDescription: 'gf',
  },
  {
    discountPrice: 6195000,
    postTime: 2,
    discountRate: 4,
    offer: true,
    text: 'جاروبرقی بوش مدل BGL82030',
    realPrice: 6450000,
    image: '/popular/3.png',
    id: 12,
    metaDescription: 'gf',
  },
  {
    discountPrice: 12000000,
    postTime: 2,
    discountRate: 5,
    offer: false,
    text: 'تلویزیون ال ای دی هوشمند اسنوا مدل SSD-50SA1560U سایز 50 اینچ',
    realPrice: 12500000,
    image: '/best-seller/2.png',
    id: 12,
    metaDescription: 'gf',
  },
];

export const BRANDS = [
  { imageUrl: '/brands/0.png' },
  { imageUrl: '/brands/1.png' },
  { imageUrl: '/brands/2.png' },
  { imageUrl: '/brands/3.png' },
  { imageUrl: '/brands/4.png' },
  { imageUrl: '/brands/5.png' },
  { imageUrl: '/brands/6.png' },
  { imageUrl: '/brands/7.png' },
  { imageUrl: '/brands/8.png' },
  { imageUrl: '/brands/9.png' },
  { imageUrl: '/brands/10.png' },
  { imageUrl: '/brands/11.png' },
];

export const NAV_ITEMS = [
  { icon: OrderList, text: 'سفارش های من' },
  { icon: Like, text: 'علاقه مندی ها' },
  { icon: Comments, text: 'نظرات' },
  { icon: Location, text: 'نشانی ها' },
  { icon: GiftCard, text: 'کارت هدیه' },
  { icon: Email, text: 'پیغام ها' },
  { icon: RecentVisits, text: 'بازدیدهای اخیر' },
  { icon: Avatar, text: 'اطلاعات حساب' },
  { icon: Exit, text: 'خروج' },
];

export const GALLERY = [
  { url: '/best-seller/2.png' },
  { url: '/best-seller/3.png' },
  { url: '/best-seller/4.png' },
  { url: '/best-seller/1.png' },
];
export const USER_INFO = [
  {
    value: 'سید حامد محمدی',
    onChange: () => {},
    label: 'نام و نام خانوادگی',
  },
  {
    value: '۰۹۱۴۴۰۹۶۸۸۲',
    onChange: () => {},
    label: 'شماره تلفن همراه',
  },
  {
    value: '۶۵/۵/۶',
    onChange: () => {},
    label: 'تاریخ تولد',
  },
  {
    value: '-',
    onChange: () => {},
    label: 'شماره کارت جهت مرجوعی وجه',
  },
];

export const PROCEEDING_INFO = {
  title: 'اطلاعات جهت پیگیری',
  data: [
    { label: 'تاریخ خرید', value: '۹۹/۱۲/۱۰' },
    { label: 'شماره فاکتور', value: '۳۲۴۵' },
    { label: 'کد پیگیری', value: 'gfdtfad۱۲۳۴۵' },
  ],
};

export const ORDER_GUY_INFO = {
  title: 'اطلاعات سفارش دهنده',
  data: [
    { label: 'نام و نام خانوادگی', value: 'حامد محمدی' },
    { label: 'کد ملی', value: '۱۶۳۹۸۱۱۳۶۲' },
    { label: 'شماره تماس', value: '۰۹۱۴۴۰۹۶۸۸۲' },
    { label: 'آدرس', value: 'تهران، خیابان شهید عراقی، کوچه ملکی نسب، پلاک ۱۹' },
  ],
};

export const RECEIVER_GUY_INFO = {
  title: 'اطلاعات جهت پیگیری',
  data: [
    { label: 'نام و نام خانوادگی', value: 'حامد محمدی' },
    { label: 'کد ملی', value: '۱۶۳۹۸۱۱۳۶۲' },
    { label: 'شماره تماس', value: '۰۹۱۴۴۰۹۶۸۸۲' },
    { label: 'آدرس', value: 'تهران، خیابان شهید عراقی، کوچه ملکی نسب، پلاک ۱۹' },
    { label: 'زمان تحویل', value: 'ساعت ۱۵ تا ۱۷ شنبه ۱۵ آبان' },
  ],
};
