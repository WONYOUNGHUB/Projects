// import * as React from 'react';



// ******************아이콘들

// import * as FarIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import * as IoIcons from "react-icons/io";

//회원관련
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PersonIcon from '@mui/icons-material/Person';
// import CoPresentIcon from '@mui/icons-material/CoPresent';
// import GroupIcon from '@mui/icons-material/Group';

//회원관리
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


//리뷰
import ReviewsIcon from '@mui/icons-material/Reviews';

//리뷰작성
import RateReviewIcon from '@mui/icons-material/RateReview';

//리뷰추천(하트)
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

//리뷰추천(별)
// import StarOutlineIcon from '@mui/icons-material/StarOutline';
// import StarIcon from '@mui/icons-material/Star';

//통계 그래프
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

//주문목록
import ListAltIcon from '@mui/icons-material/ListAlt';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import ListIcon from '@mui/icons-material/List';

//매장
import StoreIcon from '@mui/icons-material/Store';
// import StorefrontIcon from '@mui/icons-material/Storefront';
// import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

//QR코드
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
// import QrCodeIcon from '@mui/icons-material/QrCode';
// import QrCode2Icon from '@mui/icons-material/QrCode2';

// ******************아이콘들

// 
import CampaignIcon from '@mui/icons-material/Campaign';

export const SidebarDataN = [
    {
        title: '회원정보',
        path: '/zumuniyo/normal/nickmodify',
        // icon: <AiIcons.AiFillHome />,
        icon: <PersonIcon />,
        cName: 'nav-text',
    },
    {
        title: '리뷰',
        path: '/zumuniyo/normal/reviewMemList',
        // icon: <FarIcons.FaEnvelopeOpenText />,
        icon: <ReviewsIcon />,
        cName: 'nav-text'
    },
    {
        title: '주문목록',
        // path: '/LDS/normal/orderList',
        path: '/zumuniyo/orderlist',
        icon: <ListAltIcon />,
        cName: 'nav-text'
    },
    {
        title: '공지사항',        
        path: '/zumuniyo/NoticeBoard/NoticeList',
        icon: <CampaignIcon />,
        cName: 'nav-text'
    },
]

export const SidebarDataB = [
    {
        title: '회원정보',
        path: '/zumuniyo/business/nickModify',
        icon: <PersonIcon />,
        cName: 'nav-text',
    },
    {
        title: '매장리뷰관리',
        path: '/zumuniyo/business/storeReviewManage',
        icon: <RateReviewIcon />,
        cName: 'nav-text'
    },
    {
        title: '매장관리',
        path: '/zumuniyo/shoplist',
        icon: <StoreIcon />,
        cName: 'nav-text'
    },
    {
        title: '통합관리',
        // path: '/LDS/business/orderManageQR',
        path: '/zumuniyo/manager',
        icon: <QrCodeScannerIcon />,
        cName: 'nav-text'
    },
    {
        title: '공지사항',        
        path: '/zumuniyo/NoticeBoard/NoticeList',
        icon: <CampaignIcon />,
        cName: 'nav-text'
    },

]

export const SidebarDataA = [
    {
        title: '회원관리',
        path: '/zumuniyo/admin/management',
        icon: <ManageAccountsIcon />,
        cName: 'nav-text',
    },
    {
        title: '통계',
        path: '/zumuniyo/admin/statistics',        
        icon: <LeaderboardIcon />,
        cName: 'nav-text'
    },
    {
        title: '공지사항',        
        path: '/zumuniyo/NoticeBoard/NoticeList',
        icon: <CampaignIcon />,
        cName: 'nav-text'
    },
    
]

export const SidebarData = [
    {
        title:'로그인',
        path:'/zumuniyo/sociallogin',
        icon: <ContactPageIcon />,
        cName: 'nav-text'
    }
    
]