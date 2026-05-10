# Susie Jetta ✨

```
        o#######o
      o###########o
     o#############o
    #################
    ######  \########o
   '#;^ _^,/---\#####!
   ,` /^_ .-~^~-.__\#
  /    ^\/,,@@@,, ;|
 |      \!!@@@@@!! ^,
#.    .\; '9@@@P'   ^,
###./^ ----,_^^      /@-._
              ^--._,o@@@@@@
                 ^;@@@@@@@@@
                   ^-;@@@@

```

New portfolio website for Susie Jetta Makeup and Photography.
This is a full-stack application built with Vite, React, TypeScript, and Express. Deployed on Google Cloud Platform.

**Live:** https://susie-jetta.com/

---

## 📸 Photo Management

Photos are stored in **Google Cloud Storage** under the `susie-jetta-photos` bucket, organized by album:

```
albums/
  ├── I/
  ├── II/
  └── III/
```

The backend provides an API endpoint to fetch photos by album:

```
GET /api/photos?album=I
```

---

## 📝 License

© 2026 Susie Jetta. All rights reserved.
