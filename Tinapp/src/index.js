import React from 'react';
import Routes from './routes';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'image',
  'componen',
  'soucer',
  'Network'
])

export default function App() {
  return (
    <Routes />
  );
}