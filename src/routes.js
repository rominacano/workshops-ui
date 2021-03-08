import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/guards/AuthGuard';
import GuestGuard from 'src/guards/GuestGuard';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={props => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/errors/NotFoundView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    path: '*',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app/management/customers',
        component: lazy(() => import('src/views/customer/CustomerListView'))
      },
      {
        exact: true,
        path: '/app/management/customers/new',
        component: lazy(() => import('src/views/customer/CustomerNewView'))
      },
      {
        exact: true,
        path: '/app/management/customers/:customerId/car',
        component: lazy(() => import('src/views/car/CarNewView'))
      },
      {
        exact: true,
        path: '/app/management/customers/:customerId',
        component: lazy(() => import('src/views/customer/CustomerDetailsView'))
      },
      {
        exact: true,
        path: '/app/management/orders',
        component: lazy(() => import('src/views/order/OrderListView'))
      },
      {
        exact: true,
        path: '/app/management/orders/new',
        component: lazy(() => import('src/views/order/OrderNewView'))
      },
      {
        exact: true,
        path: '/app/management/orders/:carId',
        component: lazy(() => import('src/views/order/OrderListView'))
      },
      {
        exact: true,
        path: '/app/management',
        component: () => <Redirect to="/app/management/customers" />
      },
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/management/customers" />
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

export default routes;
