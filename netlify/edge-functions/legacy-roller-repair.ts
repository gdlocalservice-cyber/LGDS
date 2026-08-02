const TARGET = "https://www.localgaragedoorsvc.com/services/garage-door-roller-hinge-repair/";

export default () =>
  new Response(null, {
    status: 301,
    headers: {
      location: TARGET,
    },
  });
