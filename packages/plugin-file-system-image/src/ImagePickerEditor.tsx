// import React from 'react';
// import Cropper from 'react-easy-crop';
// import { PropertyEditorProps } from '@refract-cms/core';
// import {
//   Theme,
//   createStyles,
//   withStyles,
//   WithStyles,
//   Typography,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Grid,
//   ButtonBase,
//   Toolbar,
//   DialogTitle,
//   Avatar
// } from '@material-ui/core';
// // import { ImageRef } from '../files/image-ref';
// // import FileList from '../files/FileList';
// import { FileModel } from './file';
// import { Crop } from './crop';
// import classNames from 'classnames';
// import { combineContainers } from 'combine-containers';
// import { withCoreContext, WithCoreContextProps } from '@refract-cms/core';

// type Crops<TCrops extends string> = {
//   [P in TCrops]: {
//     aspectRatio: number;
//     minWidth?: number;
//   }
// };

// export interface ImagePickerEditorOptions<TCrops extends string> {
//   cropDefinitions: Crops<TCrops>;
// }

// const styles = (theme: Theme) =>
//   createStyles({
//     cropContainer: {
//       height: '100vh',
//       minHeight: 400,
//       position: 'relative'
//     },
//     imagePreview: {
//       width: 30,
//       height: 30,
//       marginBottom: theme.spacing(2)
//     }
//   });

// interface Props
//   extends ImagePickerEditorOptions<any>,
//     PropertyEditorProps<Crops<any>>,
//     WithStyles<typeof styles>,
//     WithCoreContextProps {}

// interface State {
//   activeCropName: string | null;
//   selectFileDialogOpen: boolean;
// }

// const ImagePickerEditor = combineContainers(withStyles(styles), withCoreContext)(
//   class extends React.Component<Props, State> {
//     constructor(props) {
//       super(props);
//       this.state = {
//         activeCropName: null,
//         selectFileDialogOpen: false
//       };
//     }

//     onCropChange = cropName => crop => {
//       this.updateCrop(cropName)({ crop });
//     };

//     updateCrop = cropName => (values: Partial<Crop>) => {
//       const { value, setValue } = this.props;
//       if (value) {
//         setValue({
//           ...value,
//           crops: {
//             ...value.crops,
//             [cropName]: {
//               ...value.crops[cropName],
//               ...values
//             }
//           }
//         });
//       }
//     };

//     onCropComplete = cropName => (croppedArea, pixelCrop) => {
//       this.updateCrop(cropName)({ pixelCrop });
//     };

//     onZoomChange = cropName => zoom => {
//       this.updateCrop(cropName)({ zoom });
//     };

//     renderHasValueUI() {
//       const { cropDefinitions, value, setValue, classes, context } = this.props;
//       const { fileService } = context;
//       return (
//         <div>
//           <Avatar src={fileService.buildImageUrl(value!.imageId)} className={classes.imagePreview} />
//           <Grid container spacing={2}>
//             {Object.keys(cropDefinitions).map(cropKey => {
//               const cropDefinition = cropDefinitions[cropKey];
//               return (
//                 <Grid item xs={12} sm={6} md={4} key={cropKey}>
//                   <Typography gutterBottom variant="caption">
//                     {cropKey}
//                   </Typography>
//                   <ButtonBase
//                     onClick={() => {
//                       this.setState({
//                         activeCropName: cropKey
//                       });
//                     }}
//                   >
//                     <img
//                       style={{ width: '100%' }}
//                       src={fileService.buildImageUrl(this.props.value!.imageId, this.props.value!.crops[cropKey])}
//                     />
//                   </ButtonBase>
//                   <Dialog open={cropKey === this.state.activeCropName} fullScreen>
//                     <DialogContent>
//                       <div className={classNames('crop-container', classes.cropContainer)}>
//                         <Cropper
//                           image={fileService.buildImageUrl(value!.imageId)}
//                           crop={value!.crops[cropKey].crop}
//                           zoom={value!.crops[cropKey].zoom}
//                           aspect={cropDefinition.aspectRatio}
//                           onCropChange={this.onCropChange(cropKey)}
//                           onCropComplete={this.onCropComplete(cropKey)}
//                           onZoomChange={this.onZoomChange(cropKey)}
//                         />
//                       </div>
//                     </DialogContent>
//                     <DialogActions>
//                       <Button
//                         onClick={() => {
//                           this.setState({
//                             activeCropName: null
//                           });
//                         }}
//                       >
//                         Done
//                       </Button>
//                     </DialogActions>
//                   </Dialog>
//                 </Grid>
//               );
//             })}
//           </Grid>
//           <br />
//           <div>
//             <Button onClick={() => setValue(undefined)}>Remove picture</Button>
//             <Button
//               onClick={() =>
//                 this.setState({
//                   selectFileDialogOpen: true
//                 })
//               }
//             >
//               Change picture
//             </Button>
//           </div>
//         </div>
//       );
//     }

//     renderHasNoValueUI() {
//       return (
//         <div>
//           <Button
//             onClick={() =>
//               this.setState({
//                 selectFileDialogOpen: true
//               })
//             }
//           >
//             Select an image
//           </Button>
//         </div>
//       );
//     }

//     render() {
//       const { cropDefinitions, value, setValue, classes } = this.props;
//       return (
//         <div>
//           {value ? this.renderHasValueUI() : this.renderHasNoValueUI()}
//           <Dialog open={this.state.selectFileDialogOpen}>
//             <DialogTitle>Select an image</DialogTitle>
//             <DialogContent>
//               <FileList
//                 onSelectFile={file => {
//                   const newValue = {
//                     imageId: file._id,
//                     crops: Object.keys(cropDefinitions).reduce((acc, cropKey) => {
//                       acc[cropKey] = {
//                         crop: { x: 0, y: 0 },
//                         zoom: 1
//                       };
//                       return acc;
//                     }, {})
//                   };
//                   setValue(newValue);
//                   this.setState({
//                     selectFileDialogOpen: false
//                   });
//                 }}
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button
//                 onClick={() =>
//                   this.setState({
//                     selectFileDialogOpen: false
//                   })
//                 }
//               >
//                 Done
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </div>
//       );
//     }
//   }
// );

// export default function<TCrops extends string>(options: ImagePickerEditorOptions<TCrops>) {
//   return ((props: PropertyEditorProps<ImageRef<TCrops>>) => (
//     <ImagePickerEditor {...(props as any) as PropertyEditorProps<ImageRef<TCrops>>} {...options} />
//   )) as React.ComponentType<PropertyEditorProps<ImageRef<TCrops>>>;
// }
