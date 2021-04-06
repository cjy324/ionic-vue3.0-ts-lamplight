import { alertController } from '@ionic/vue';

export async function showAlert(msg: string) {
  const alert = await alertController
    .create({
      header: 'Notice',
      message: msg,
      buttons: ['OK'],
    });
  return alert.present();
} 

export async function showAlertConfirm(msg: string): Promise<boolean> {
  let resolveFunction: (confirm: boolean) => void;
  const promise = new Promise<boolean>(resolve => {
    resolveFunction = resolve;
  });
  const alert = await alertController
    .create({
      header: 'Confirm',
      message: msg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            resolveFunction(true)
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            resolveFunction(false)
          },
        },
      ],
    });
  alert.present();
  return promise;
}

export function isEmptyObject(param: {}) {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

export function toInt(data: any, defaultValue: any) {
  if ( data == undefined || data == null || isNaN(data) ) {
    return defaultValue;
  }

  return parseInt(data)
}

export function toIntOrUnd(data: any) {
  return toInt(data, undefined);
}

export function toIntOrNull(data: any) {
  return toInt(data, null);
}

export function toStringOrNull(data: any) {
  if ( data == null ) {
    return null;
  }

  if ( data == "null" ) {
    return null;
  }

  return data;
} 