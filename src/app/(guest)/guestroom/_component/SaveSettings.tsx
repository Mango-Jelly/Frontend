export const saveToSessionStorage = (
  isCameraOn: boolean,
  isAudioOn: boolean
) => {
  sessionStorage.setItem('isCameraOn', JSON.stringify(isCameraOn));
  sessionStorage.setItem('isAudioOn', JSON.stringify(isAudioOn));
};
