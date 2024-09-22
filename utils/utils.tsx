import { Bounce, ToastContainerProps, ToastPosition } from 'react-toastify';

export const toastifyMessage = {
  position: 'bottom-center' as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
};

export const toastContainerConfig: ToastContainerProps = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'light',
  transition: Bounce,
};

export enum RoutePath {
  HOME = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  HISTORY = '/history',
  REST_CLIENT_GET = '/GET',
  REST_CLIENT_POST = '/POST',
  REST_CLIENT_PUT = '/PUT',
  REST_CLIENT_PATCH = '/PATCH',
  REST_CLIENT_DELETE = '/DELETE',
  GRAPHIQL_CLIENT = '/GRAPHQL',
  NOT_FOUND = '/404',
}

export enum MiddleWarePath {
  LOGIN = '/api/login',
  LOGOUT = '/api/logout',
}

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export enum ResponseTitle {
  RESPONSE = 'Response',
  ERROR = 'Error',
}

export const handleScrollWithRef = (ref: React.RefObject<HTMLElement>) => {
  if (!ref.current) return;

  if (window.scrollY > 10) {
    ref.current.classList.add('sticky');
  } else {
    ref.current.classList.remove('sticky');
  }
};
