import {ModuleOptions} from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';
import ReactRefreshTypeScript from "react-refresh-typescript";
import {buildBbaelLoader} from "./babel/buildBabelLoader"

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development'; 

    const cssLoaderWithModules = {
      loader: 'css-loader',
      options: {
        modules:{
          localIdentName: isDev ? '[path][name]__[local]': '[hash:base64:8]'
        }
      }
    }

    const assetLoader = {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    }

    const svgLoader =  {
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon:true,
          }
        }
      ],
    }

    const sassLoader = {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          isDev ? "style-loader":MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          cssLoaderWithModules,
          // Compiles Sass to CSS
          "sass-loader",
        ],
      };

    const babelLoader =  buildBbaelLoader(options);
    const tsxLoader = {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            getCustomTransformers: () => ({
              before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
            }),
            transpileOnly: false
          }
        }],
        exclude: /node_modules/,
      }; 
    return [
        assetLoader,
        sassLoader,
        tsxLoader,
        // babelLoader,
        svgLoader,
      ]
}