# ✨ Susie Jetta Makeup and Photography 📸

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

## Repo

[github.com/stefanbobrowski/susie-jetta-gcp](github.com/stefanbobrowski/susie-jetta-gcp)

## License

See [LICENSE](LICENSE) file for details. All rights reserved.

## Author

**Stefan Bobrowski**

Github: [https://github.com/stefanbobrowski](https://github.com/stefanbobrowski)  
Portfolio: [https://stefanbobrowski.com](https://stefanbobrowski.com)  
Email: stefanbobrowski1@gmail.com
