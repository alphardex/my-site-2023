#include "/node_modules/lygia/generative/random.glsl"
#include "/node_modules/lygia/math/const.glsl"

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

uniform sampler2D tDiffuse;

varying vec2 vUv;

uniform float uRGBShift;
uniform vec3 uBgColor;
uniform float uMaskStrength;
uniform sampler2D uDisplacement;
uniform float uRippleStrength;
uniform float uRGBShiftStrength;

vec3 grain(vec2 uv,vec3 col){
    float noise=random(uv+iTime);
    col+=(noise-.5)*.075;
    return col;
}

vec3 vignette(vec2 uv,vec3 col){
    float maskLength=.25;
    float mask=smoothstep(0.,maskLength,uv.y)*smoothstep(1.,1.-maskLength,uv.y);
    // col*=mask;
    float mixFactor=(1.-mask)*uMaskStrength;
    col=mix(col,uBgColor,mixFactor);
    // col=vec3(mixFactor);
    return col;
}

vec4 RGBShift(sampler2D tex,vec2 uv,float amount){
    vec2 rUv=uv;
    vec2 gUv=uv;
    vec2 bUv=uv;
    float noise=random(uv+iTime)*.5+.5;
    vec2 offset=amount*vec2(cos(noise),sin(noise));
    rUv+=offset;
    gUv+=offset*.5;
    bUv+=offset*.25;
    vec4 rTex=texture(tex,rUv);
    vec4 gTex=texture(tex,gUv);
    vec4 bTex=texture(tex,bUv);
    vec4 col=vec4(rTex.r,gTex.g,bTex.b,gTex.a);
    return col;
}

vec2 distort(vec2 p,sampler2D tex){
    vec4 displacement=texture(tex,p);
    float theta=displacement.x*2.*PI;
    vec2 dir=vec2(sin(theta),cos(theta));
    vec2 dp=p+dir*displacement.x*.1*uRippleStrength;
    return dp;
}

void main(){
    vec2 uv=vUv;
    uv=distort(uv,uDisplacement);
    vec4 tex=RGBShift(tDiffuse,uv,uRGBShift*.75*uRGBShiftStrength);
    vec3 col=tex.xyz;
    col=grain(uv,col);
    col=vignette(uv,col);
    gl_FragColor=vec4(col,1.);
}