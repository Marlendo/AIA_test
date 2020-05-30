import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { Provider, reducer, initialState } from './src/service';
import RNBootSplash from "react-native-bootsplash";
import MainRoot from './src/router';
import { Activity } from './src/components/activity';
import { colors } from './src/styles';

const theme = {
  ...DefaultTheme,
  roundness: 7,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: '#f1c40f',
  },
};

function App() {

  let init = async () => {
    console.log('running debug mode ...')
  };

  useEffect(() => {    
    init().finally(() => {
      RNBootSplash.hide({ duration: 500 });
    });
  }, []);

  return (
    <Provider reducer={reducer} initialState={initialState}>
      <PaperProvider theme={theme}>
        <Activity />
        <MainRoot />        
      </PaperProvider>
    </Provider>
  );
}

export default App;