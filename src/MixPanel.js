import mixpanel from 'mixpanel-browser';

mixpanel.init('8ec07c5cc6c95884a2120d3c11e92fb9', {debug:true, ignore_dnt: true});

let env_check = process.env.NODE_ENV === 'production';

let actions = {
  identify: (id) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check) {
        mixpanel.track(name+'_prod', props)}
        else{
    mixpanel.track(name+'_dev', props)
        }
  },
  people: {
    set: (props) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};

export let Mixpanel = actions;