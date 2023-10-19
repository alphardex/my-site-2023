#include "/node_modules/lygia/math/const.glsl"

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;

varying vec2 vUv;

uniform float uVelocity;
uniform float uDistortX;
uniform float uDistortZ;

uniform float uProgress;
uniform vec2 uMeshSize;
uniform vec2 uMeshPosition;

vec3 distort(vec3 p){
    p.y+=sin(uv.x*PI)*uVelocity*uDistortX;
    p.z+=cos((p.y/iResolution.y)*PI)*abs(uVelocity)*uDistortZ;
    return p;
}

float getStagger(vec2 uv){
    float left=uv.x;
    float bottom=uv.y;
    float right=1.-uv.x;
    float top=1.-uv.y;
    return top*right;
}

vec3 transition(vec3 p){
    float pr=uProgress;
    float stagger=getStagger(uv);
    pr=smoothstep(stagger*.8,1.,pr);
    
    // vec2 targetScale=iResolution.xy/uMeshSize.xy;
    // targetScale*=.75;
    vec2 targetScale=vec2(1.25);
    vec2 scale=mix(vec2(1.),targetScale,pr);
    p.xy*=scale;
    
    vec2 targetPosition=uMeshPosition;
    targetPosition.x-=(iResolution.x*.145)*pr;
    targetPosition.y+=(iResolution.y*.045)*pr;
    p.xy+=-targetPosition*pr;
    
    p.z+=pr;
    
    return p;
}

void main(){
    vec3 p=position;
    p=transition(p);
    vec4 mvPosition=modelViewMatrix*vec4(p,1.);
    mvPosition.xyz=distort(mvPosition.xyz);
    gl_Position=projectionMatrix*mvPosition;
    
    vUv=uv;
}