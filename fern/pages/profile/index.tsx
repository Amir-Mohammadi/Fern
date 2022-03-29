import FooterContainer from '@Containers/footer-container';
import UserPanelContainer from '@Containers/user-container';
import Head from 'next/head';
import React from 'react';

const UserProfilePage = () => {
  return (
    <div style={{ flexDirection: 'column' }}>
      <Head>
        <title>فروشگاه السل</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserPanelContainer />
      <FooterContainer />
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps<PageProps> = withToken(async (context) => {
//   const token = authService.getToken();
//   const likedByMeProducts = await apiService.v1.UserApi.getUserLikedProducts();
//   const recentlyVisitedProducts = (await apiService.v1.UserApi.getRecentlyVisitedProducts()) ?? null;
//   const userAddresses = await apiService.v1.UserApi.getUserAddresses();
//   const userComments = await apiService.v1.UserApi.getUserComments();
//   const userData = await apiService.v1.UserApi.getCurrentUser();
//   const provinces = await apiService.v1.CommonApi.getProvinces();
//   const userOrders = (await apiService.v1.UserApi.getUserOrders()) ?? null;
//   if (token) {
//     return {
//       props: {
//         initialMobxState: {
//           userStore: {
//             likedByMeProducts,
//             recentlyVisitedProducts,
//             userAddresses,
//             userComments,
//             userData,
//             provinces,
//             userOrders,
//           },
//         },
//       },
//     };
//   } else {
//     return {
//       redirect: {
//         destination: '/login-register',
//         permanent: false,
//       },
//     };
//   }
// });

export default UserProfilePage;
