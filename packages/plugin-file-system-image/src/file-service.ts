// import { ImageRef } from './image-ref';
import type { Crop } from './crop';
import queryString from 'query-string';
// import { FileModel } from './file';
import url from 'url';

export class FileService {
  constructor(private serverUrl: string) {}
  // buildImageUrl = <TCrops extends string>(imageRef: ImageRef<TCrops>, crop: Crop) =>
  //   `${imageRef.imageUrl}?${queryString.stringify(crop.pixelCrop)}`;

  buildImageUrl = ({ fileId, pixelCrop }: { fileId: string; pixelCrop?: Crop['pixelCrop'] }) => {
    const cropQuery = pixelCrop ? `?${queryString.stringify(pixelCrop)}` : '';
    // return new url.URL(`/plugins/filesystemimage/files/${fileId}${cropQuery}`, this.serverUrl);
    // return url.resolve(this.serverUrl, `/plugins/filesystemimage/files/${fileId}${cropQuery}`);
    // return url.format({
    //   protocol:  context.req.protocol,
    //   host: context.req.get('host'),
    //   pathname: context.baseUrl,
    // });
    return `${this.serverUrl}/plugins/filesystemimage/files/${fileId}${cropQuery}`;
  };

  // upload = (file: File) => {
  //   const data = new FormData();
  //   data.append('file', file);
  //   return axios.post(`${this.serverUrl}/files`, data).then(r => r.data);
  // };
}
