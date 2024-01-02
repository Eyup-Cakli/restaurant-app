# restaurant-app

Case study

//EN//

General Information 
Imagine that you are building a restaurant. The system includes a list of restaurants and restaurant information 
receives. Users will be able to order from the restaurant after logging into the system, about the restaurant 
he will be able to comment and give points. 
Detail Information 


Users log into the system with a user name and password. Username, password, email address ,age, age, 
gender can define profile picture. You must be able to enter more than one address information for the order. 
You should be able to order food from the restaurant, make a lonely comment to the restaurant for each order, and 
you should be able to give only one point. Date, time information of orders must be kept. 


Restaurants must have name, description, logo and address information. Address information should include province, county and open address, and, 
location information of the restaurant should be kept. The restaurant may have more than one branch. Belongs to the restaurant 
menu designation can be done. Information such as the price, content, cover art of the menu should be kept. Suddenly 
more types of restaurants should be identified. (Turkish cuisine, fast food, etc.) 


Problem1 
Database design on MongoDB in line with the above information 
desired. 


Problem2 
In the description, list the 39.93 restaurants closest to the coordinates, which include lahmacun (32.85). 


Problem3 
Small cheese pizza 50TL, Medium-sized mushroom pizza 100TL, Hamburger 120Tl 
food is the new addition to the menu of the Loco Fast Food restaurant. All records in one transaction 
write the question that adds in it. 


Problem4 
Based on the comments made to the restaurants, list the 20 male users who made the last comment by age. 
(In the next query, you interpret the next 20 men to be listed and write the query 
expected) 


Problem5 
Based on points made to restaurants, at least 1 of their categories is fast food or home food 
or in the restaurant description that includes fast, only the names, categories and above 4-point restaurants 
write the query that gives the explanation. 

Problem6 
You will connect to the database you create with Mongoose in NodeJS and pagination restaurants 
type the endpoint that serves the client side in the way and the average of the points given to the restaurant is high 
sort by what is lower than what is. 


//TR//

Genel Bilgi 


Bir restoran uygulaması yaptığınızı düşünün. Sistemde restoranların listesi ve restorana ait bilgiler yer 
almaktadır. Kullanıcılar sisteme login olduktan sonra restorandan sipariş verebilecek, restorana dair 
yorum yapabilecek ve puan verebilecektir. 
Detay Bilgiler 


Kullanıcılar sisteme kullanıcı adı ve parolayla giriş yapmaktadır. Kullanıcı adı, parola, email adresi , yaş, 
cinsiyet, profil resmi tanımlayabilmektedir. Sipariş için birden fazla adres bilgisi girebilmelidir. 
Restorandan yemek sipariş edebilmeli, restorana her sipariş için yalnız bir yorum yapabilmeli ve 
sadece bir kere puan verebilmelidir. Siparişlere ait tarih, saat bilgileri tutulmalıdır. 


Restoranlar için ad, açıklama, logo ve adres bilgisi olmalıdır. Adres bilgisi il, ilçe ve açık adres içermeli, 
restoranın lokasyon bilgileri tutulmalıdır. Restoranın birden fazla şubesi olabilmektedir. Restorana ait 
menü tanımı yapılabilmelidir. Menünün fiyatı, içeriği, kapak resmi gibi bilgiler tutulmalıdır. Birden 
fazla restoran tipi tanımlanabilmelidir. (Türk mutfağı, fast food v.b.) 

Problem1 

Yukarıda yer alan bilgiler doğrultusunda MongoDB üzerinde veri tabanı tasarımı yapılması 
istenmektedir. 


Problem2 

Açıklamasında lahmacun içeren, (39.93, 32.85) koordinatlara en yakın 5 restoranı listeleyiniz. 


Problem3 

Küçük boy peynirli pizza 50TL, Orta boy mantarlı pizza 100TL, Hamburger 120Tl olarak belirtilen 
yiyecekler Voco Fast Food restoranının menüsüne yeni eklencektir. Bütün kayıtları tek bir transaction 
içerisinde ekleyen sorguyu yazınız. 


Problem4 

Restoranlara yapılan yorumlar baz alınarak, son yorum yapan 20 erkek kullanıcıyı yaşa göre sıralayınız. 
(Bir sonraki sorguda sonraki 20 erkek listelenecek şeklinde yorumlayıp sorguyu yazmanız 
beklenmektedir) 


Problem5 

Restoranlara yapılan puanlar baz alınarak, kategorilerinden en az 1 i fast food veya ev yemekleri olan 
veya restoran açıklamasında fast içeren, 4 puan üstü restoranların sadece adlarını, kategorilerini ve 
açıklamasını veren sorguyu yazınız. 


Problem6 

Oluşturduğunuz veritabanına NodeJS içinde Mongoose ile bağlanıp restoranları pagination olacak 
şekilde client tarafına servis eden endpointi yazınız ve restorana verilen puanların ortalaması yüksek 
olandan düşük olana göre sıralayınız. 
