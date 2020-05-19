const prodPlugins=[];

if(process.env.NODE_ENV==='profuction'){
  prodPlugins.push('transform-remove-console');
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins:[
    ...prodPlugins,
    "@babel/plugin-syntax-dynamic-import"
  ]
}
