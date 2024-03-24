README


This practical assignment is to use three.js create a WebXR scene of UCC Quad with four independently animated characters (avatars). On the screen, three students can be seen dancing in front of the building as an audience applauds them.



------------------------The scene includes the following details------------------------

1. Use ColladaLoader to load the UCCQuad model.

2. Use FBXLoader to load four avatars models ("Brooklyn Uprock.fbx", "Breakdance Freeze Var 3.fbx", "Flair.fbx" and "Clapping.fbx") and use AnimationMixer to show dance animation and clap animation. It contains three dancers and an audience.

3. Use BoxGeometry to create 3D world. Use PlaneGeometry to create six faces of 3D world and load the skybox pictures to texture the faces.

4. Use PlaneGeometry to create a ground floor with image texture. 

5. Use PlaneGeometry to create a carpet with image texture. Characters can dance on the carpet.

6. Use FBXLoader to load tree model as decoration.

7. Use FBXLoader to load stage light model, which has many parameters can be configured through GUI, such as "light color", "intensity", "distance", "angle", "penumbra", "decay" and "focus".

8. Create three different types of lights:
One is ambient light.
Two is point light, which can be as sunlight.
The third one is spot light, which can be as stage light.

9. Use TorusGeometry to create a ring placed on the top of building, which can be changed color by vertex-fragment shader pairs.

10.Add text to show "A Day in University College Cork", which has changeable color effect through vertex-fragment shader pairs.

11.Use CylinderGeometry and vertex-fragment shader pairs to create five colourful lights placed in front of campus.

12.Use PlaneGeometry to create billboard, which can show a video about "a day in cork".

13.Use PositionalAudio to create spatial sound, which can be different depend on the distance between the audience and the origin (0, 0, 0).

14.Use "dat.gui.module.js" to create GUI, which includes controls of "Video", "Music", "Sun Position", "Stage Light" and "Rotate Flag".

15.Use "stats.js" print out system performance statistics to the screen.

16.Use "OrbitControls.module.js" to enable mouse control.

17.All characters used "castShadow" and "receiveShadow" to show shadows.

18.Define a function named "onWindowResize" to adapt the size of window.

19.Use "ammo.wasm.js" to incorporate some basic physics and create a UCC flag, which can be rotated by controlling widget of GUI.

20.All of codes have comments.

21.All function calls and results can be printed on console.



------------------------Reference libs------------------------

1. three.module.js

2. ColladaLoader.js

3. FBXLoader.js

4. OrbitControls.module.js

5. dat.gui.module.js

6. fflate.module.min.js

7. Lensflare.js

8. stats.module.js

8. helvetiker_regular.typeface.json

9. NURBSCurve.js

10. NURBSUtils.js

11. AmmoPhysics.js

12. ammo.wasm.wasm

13. TGALoader.js



------------------------Assets Resources------------------------

1. UCC_Quad_Model_DAE
https://ucc.instructure.com/courses/37025/assignments/116193

2. video.mp4
Filming and editing by myself

3. audio.mp3
https://youtu.be/L1yjyYarLVI?

4. Brooklyn Uprock.fbx
https://www.mixamo.com/

5. Breakdance Freeze Var 3.fbx
https://www.mixamo.com/

6. Flair.fbx
https://www.mixamo.com/

7. Clapping.fbx
https://www.mixamo.com/

8. lensflare0.png
https://threejs.org/examples/#webgl_lensflares

9. lensflare3.png
https://threejs.org/examples/#webgl_lensflares

10. UCC.png
https://corkcollegeofcommerce.ie/wp-content/uploads/2017/01/UCC.png

9. stone floor.png
https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/371b6fdf-69a3-4fa2-9ff0-bd04d50f4b98/de8synv-6aad06ab-ed16-47fd-8898-d21028c571c4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM3MWI2ZmRmLTY5YTMtNGZhMi05ZmYwLWJkMDRkNTBmNGI5OFwvZGU4c3ludi02YWFkMDZhYi1lZDE2LTQ3ZmQtODg5OC1kMjEwMjhjNTcxYzQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wa-oSVpeXEpWqfc_bexczFs33hDFvEGGAQD969J7Ugw

10. carpet.jpeg
https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sketchuptextureclub.com%2Ftextures%2Fmaterials%2Frugs%2Fpersian-oriental-rugs%2Fcut-out-persian-rug-texture-20139&psig=AOvVaw0jk0yXaabMvlXiYQHyKi5X&ust=1648476163403000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKjzjLO65vYCFQAAAAAdAAAAABAE

11. StageLight-11-FBX
https://free3d.com/3d-model/stage-light-11-507175.html

12. Tree
https://free3d.com/3d-model/tree-74556.html

13. rainbow_rt.png
https://opengameart.org/content/elyvisions-skyboxes

14. rainbow_lf.png
https://opengameart.org/content/elyvisions-skyboxes

15. rainbow_up.png
https://opengameart.org/content/elyvisions-skyboxes

16. rainbow_dn.png
https://opengameart.org/content/elyvisions-skyboxes

17. rainbow_ft.png
https://opengameart.org/content/elyvisions-skyboxes

18. rainbow_bk.png
https://opengameart.org/content/elyvisions-skyboxes