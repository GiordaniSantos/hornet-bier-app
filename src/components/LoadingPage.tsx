import { ActivityIndicator } from "react-native";

export default function Loading({loading}:{loading:boolean}){
  if(loading){
    return <ActivityIndicator size={'large'} color={'#ff3a00'} style={{marginBottom: 20, marginTop: 15}} />
  }
  return null;
}