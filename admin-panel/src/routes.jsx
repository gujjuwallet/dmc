import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import AuthGuard from 'components/AuthGuard/AuthGuard';
import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    guard: AuthGuard,
    routes: [
      {
        exact: 'true',
        path: '/dashboard',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        exact: 'true',
        path: '/logout', // Add the logout route here
        element: lazy(() => import('./views/auth/Logout')),
      },
      {
        path: '/hotels',
        element: lazy(() => import('./views/hotels/HotelList'))
      },
      {
        path: '/hotels/add-hotel',
        element: lazy(() => import('./views/hotels/HotelAdd'))
      },
      {
        path: '/hotels/edit-hotel/:id',
        element: lazy(() => import('./views/hotels/HotelEdit'))
      },   
      {
        path: '/transport',
        element: lazy(() => import('./views/transport/TransportList'))
      },
      {
        path: '/transport/add',
        element: lazy(() => import('./views/transport/TransportAdd'))
      },
      {
        path: '/transport/edit/:id',
        element: lazy(() => import('./views/transport/TransportEdit'))
      },      
      {
        path: '/packages',
        element: lazy(() => import('./views/package/PackageList'))
      },
      {
        path: '/packages/add',
        element: lazy(() => import('./views/package/AddPackage'))
      },
      {
        path: '/packages/edit/:id',
        element: lazy(() => import('./views/package/EditPackage'))
      },      

      {
        path: '/itineraries',
        element: lazy(() => import('./views/itinerary/ItineraryList'))
      },
      {
        path: '/itineraries/add',
        element: lazy(() => import('./views/itinerary/AddItinerary'))
      },
      {
        path: '/itineraries/edit/:id',
        element: lazy(() => import('./views/itinerary/EditIntenerary'))
      },      

      {
        exact: 'true',
        path: '/basic/button',
        element: lazy(() => import('./views/ui-elements/basic/BasicButton'))
      },
      {
        exact: 'true',
        path: '/basic/badges',
        element: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
      },
      {
        exact: 'true',
        path: '/basic/breadcrumb-paging',
        element: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      },
      {
        exact: 'true',
        path: '/basic/collapse',
        element: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: 'true',
        path: '/basic/tabs-pills',
        element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: 'true',
        path: '/basic/typography',
        element: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: 'true',
        path: '/forms/form-basic',
        element: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: 'true',
        path: '/tables/bootstrap',
        element: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: 'true',
        path: '/maps/google-map',
        element: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
