interface EnvironmentConfig {
  apiUrl: string;
}

interface Config {
  development: EnvironmentConfig;
  production: EnvironmentConfig;
}

const config: Config = {
  development: {
    apiUrl: "http://192.168.1.128:5000/",
  },
  production: {
    apiUrl: "https://api.gibbonsiv.com/",
  },
};

const environment: string = process.env.NODE_ENV || "development";

export const apiUrl: string = config[environment as keyof Config].apiUrl;
