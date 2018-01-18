import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import DragAndDropPuzzle from '../recipes/dnd/DragAndDropPuzzle';
import DragAndDropFlowchart from '../recipes/dnd/DragAndDropFlowchart';
import DragAndDropMap from '../recipes/dnd/DragAndDropMap';
import DragAndDropVegAndFru from '../recipes/dnd/DragAndDropVegAndFru';
import DragAndDropFillBlanks from '../recipes/dnd/DragAndDropFillBlanks';
import Ref from '../recipes/core/Ref';
import './style.css';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);


storiesOf('Core', module)
  .add('Ref', () => <Ref />);


storiesOf('DragAndDrop', module)
  .add('DragAndDropPuzzle', () => <DragAndDropPuzzle />)
  .add('DragAndDropFlowchart', () => <DragAndDropFlowchart />)
  .add('DragAndDropMap', () => <DragAndDropMap />)
  .add('DragAndDropVegAndFru', () => <DragAndDropVegAndFru />)
  .add('DragAndDropFillBlanks', () => <DragAndDropFillBlanks />)
