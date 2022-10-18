import localEnvironment from './local';
import prodEnvironment from './production';

export let environment: any;

if (process.env.AWS_SAM_LOCAL) {
  environment = localEnvironment;
} else {
  environment = prodEnvironment;
}
