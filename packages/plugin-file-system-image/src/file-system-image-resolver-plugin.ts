import { createResolverPlugin } from '@refract-cms/server';
import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { FileService } from './file-service';
import { FileModel } from './file';
import url from 'url';

// const fileSystemImageType = new GraphQLObjectType({
//   name: 'FileSystemImage',
//   fields: () => ({

//   })
// })

export default createResolverPlugin({
  alias: 'fileSystemImage',
  buildFieldConfig: (args) => {
    return {
      type: GraphQLString,
      name: 'FileSystemImage',
      args: {
        height: { type: new GraphQLNonNull(GraphQLInt) },
        width: { type: new GraphQLNonNull(GraphQLInt) },
        // x: { type: GraphQLInt },
        // y: { type: GraphQLInt }
      },
      resolve: (source, args, context) => {
        // const serverUrl = context.req.protocol + '://' + context.req.host + context.serverConfig.rootPath;
        const serverUrl = url.format({
          protocol: context.req.protocol,
          host: context.req.get('host'),
          pathname: context.serverConfig.rootPath,
        });
        const fileService = new FileService(serverUrl);
        const fileModel: FileModel & { _id: string } = source;
        return fileService.buildImageUrl({
          fileId: fileModel._id,
          pixelCrop: args as any,
        });
      },
    };
  },
});
