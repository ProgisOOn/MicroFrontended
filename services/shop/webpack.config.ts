import webpack from 'webpack';
import {BuildMode,buildWebpack,BuildPaths,BuildPlatform} from "@packages/build-config"
import path from 'path';
import packageJson from "./package.json";

interface EnvVariables {
  mode?: BuildMode,
  port?: number,
  analyzer?: boolean,
  platform?: BuildPlatform

}



export default(env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
  }
  //@ts-ignore
  const config: webpack.Configuration = buildWebpack({ 
    port: env.port ?? 3001,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? "desktop",
  })

    config.plugins.push( new webpack.container.ModuleFederationPlugin({
      name: 'shop',
      filename: 'remoteEntry.js',
      exposes: {
        './Router': './src/router/Router.tsx'
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
        },

        "react-router-dom": {
          eager: true,
        },
        "react-dom": {
          eager: true,
        },
      },
    }))

    return config;
}
