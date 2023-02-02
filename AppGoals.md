# App Goals #

### **_TODOs:_**
* handler for 0% price change!
* place currency for API calls in context
* Fix Labels for 7 -> 'All Time' on Graph Display in Coin Detail
* Market Data Section below graph
* Header above Market Data to switch between market data & news & other info
* Ability to press on graph and display data for that point
* Select other cryptos from detail page


### **_Create UI/UX for:_**
* Landing page/Home page
  * Search?
  * Future: Login/Signup
* Page to search crypto's based on other info?
* Notifications button?
  * Once accounts are created, give the ability to favorite cryptos and place them at the top of home page?


## **_Naming Conventions & Folder Structure:_**
**Case Sensitive instructions!**  
**Bold letters are strict policies, must be followed.**  
**Italic letters are the custom portion of the naming.**

### **_src_**
* components 
  * screen-name - _*coin-detail (folder) = CoinDetailScreen.tsx_
    * _components unique to the structure and design of the page_
    * _*Header.tsx_
    * index.ts
  * reusables - _used in several portions of screens_
    * _unique, descriptive names_
    * _*HeaderRight.tsx_
    * index.ts
  * index.ts
* Hooks - _used across components mostly_
  * **use**_NameOfHook_**.tsx**
  * index.ts
* screens - _used for main navigation in App_
  * _Name_**Screen.tsx**
  * index.ts
* Validators - _used for exporting TypeScript Types_
  * _Name_**Validator.ts**
* **App.tsx** - _main_
* routes.tsx - _react native stack navigator here_


### **_Build Styling Notes:_**
* #### **_Font Families_**
  * **Roboto-**
    * Regular
    * Black
      * Italic
    * Bold
      * Italic
    * Italic
    * Light
      * Italic
    * Medium
      * Italic
    * Thin
      * Thin Italic
  * **SourceCodePro-**
    * VariableFont_wght
    * Italic-VariableFont_wght