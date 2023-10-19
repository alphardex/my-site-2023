#include "/node_modules/furina/image/cover.glsl"
#include "/node_modules/lygia/sdf/rectSDF.glsl"

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;

uniform sampler2D uTexture;
uniform vec2 uMediaSize;
uniform vec2 uMeshSize;

varying vec2 vUv;

uniform float uOpacity;
uniform float uProgress;

void main(){
    vec2 uv=vUv;
    vec2 uv2=vUv;
    uv=cover(iResolution.xy,uMediaSize.xy,uv);
    uv-=.5;
    uv/=mix(1.2,.85,uProgress);
    uv+=.5;
    vec4 tex=texture(uTexture,uv);
    vec3 color=tex.rgb;
    
    float aspect=uMeshSize.x/uMeshSize.y;
    uv2-=.5;
    uv2.x*=aspect;
    uv2+=.5;
    float d=rectSDF(uv2,vec2(aspect,1.)*2.1,.25);
    float c=1.-smoothstep(0.,.01,d);
    float alpha=c;
    // color=vec3(c);
    // alpha=1.;
    
    alpha*=uOpacity;
    
    vec4 final=vec4(color,alpha);
    
    gl_FragColor=final;
}