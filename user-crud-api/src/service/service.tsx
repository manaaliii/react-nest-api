import axios from "axios";

export default class Service {  
  static API_URL: string = 'http://localhost:3001/'

  // static API_URL='https://dev-api.eaa-atc.online/'
  static API_Call_Counter: number = 0;
  static incre_API_Call_Counter = (): void => {
    this.API_Call_Counter++;
  };
  static decre_API_Call_Counter = (): void => {
    this.API_Call_Counter = this.API_Call_Counter > 0 ? this.API_Call_Counter - 1 : 0;
  };

  static error_message: string = "Something went wrong!";
  static error_message_key: string = "error_message_key";

  static message_container: { id: number, text: string }[] = [];

  static add_message = (text: string): number => {
    const id = this.message_container.length + 1;
    this.message_container.push({ id, text });
    return id;
  };
  static remove_message = (id: number): void => {
    this.message_container = this.message_container.filter((msg) => msg.id !== id);
  };
  static messageError = (msg: string): void => {
    const id = this.add_message(msg);

  };

  static messageInfo = (msg: string): void => {
    const id = this.add_message(msg);
  };

  static postMethod: string = "POST";
  static getMethod: string = "GET";
  static putMethod: string = "PUT";
  static deleteMethod: string = "DELETE";
  static headers = {
    accept: "application/json",
    "content-type": "application/json",
  };
  static refreshToken = "/auth/refreshToken";


  static user = 'user'
  static editUser = 'user/:id'
  static addUser = 'user'


  static async makeAPICall({
    methodName,
    api_url,
    props,
    body,
    params,
    options,
  }: {
    props?: any;
    methodName: string;
    api_url: string;
    body?: any;
    params?: any;
    options?: any;
  }): Promise<any> {
    api_url = this.API_URL + api_url;

    // request interceptor to add the auth token header to requests
    axios.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem('authorization');

        if (accessToken) {
          config.headers = {
            accept: "application/json",
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            authorization: "Bearer " + accessToken,
            platform: "web-admin",
            ...options,
          };
        } else {
          config.headers = {
            accept: "application/json",
            "content-type": "application/json",
            platform: "web-admin",
            ...options,
          };
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    // response interceptor to refresh token on receiving token expired error
    axios.interceptors.response.use(
      (response:any) => {
        if (response.data.code === 401) {
          localStorage.clear();
          // window.location  = "/login";
        } else {
          return response;
        }
      },
      async function (error) {
        const originalRequest = error.config;
        let refreshToken:any = localStorage.getItem("refreshToken");
        if (
          refreshToken &&
          error?.response?.status === 401 &&
          !originalRequest._retry
        ) {
          if (originalRequest.url?.includes("/refreshToken")) {
            return Promise.reject(error);
          }
          originalRequest._retry = true;
          try {
            const url = `${Service.API_URL}${Service.refreshToken}`;
            const response = await axios.post(url, {
              refreshToken: refreshToken,
            });
            if (response.status === 200 && response.data.authToken) {
              localStorage.setItem("authorization", response.data.responseData.access_token);
              localStorage.setItem("refreshToken", response.data.authToken.refreshToken);
              console.log("Access token refreshed!");
              const res = await axios(originalRequest);
              return res;
            } else {
              console.log("Refresh Token Error", error);
              return Promise.reject(response);
            }
          } catch (e) {
            return Promise.reject(e);
          }
        } else {
          return Promise.reject(error);
        }
      }
    );

    if (methodName === this.getMethod) {
      if (params) {
        api_url = `${api_url}?${params}`;
      }
      try {
        const response = await axios.get(api_url);
        return response;
      } catch (error:any) {
        if (props && error.response && error.response.status === 401) {
          this.logOut(props);
        }
        return error.response;
      }
    }
    if (methodName === this.postMethod) {
      if (params) {
        api_url = `${api_url}/${params}`;
      }
      try {
        const response = await axios.post(api_url, body, options);
        return response;
      } catch (error:any) {
        if (props && error.response && error.response.status === 401) {
          this.logOut(props);
        }
        return error.response;
      }
    }
    if (methodName === this.putMethod) {
      if (params) {
        api_url = `${api_url}/${params}`;
      }
      try {
        const response = await axios.put(api_url, body, options);
        return response;
      } catch (error:any) {
        if (props && error.response && error.response.status === 401) {
          this.logOut(props);
        }
        return error.response;
      }
    }
    if (methodName === this.deleteMethod) {
      if (params) {
        api_url = `${api_url}/${params}`;
      }
      try {
        const response = await axios.delete(api_url, { data: body });
        return response;
      } catch (error:any) {
        if (props && error.response && error.response.status === 401) {
          this.logOut(props);
        }
        return error.response;
      }
    }

    return Promise.reject("Invalid methodName");
  }

  static logOut(props: any): void {
    props.logOutHandler();
    props.history.push("/login");
  }
}
