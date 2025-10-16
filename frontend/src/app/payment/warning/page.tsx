"use client";

import React, { useState } from "react";
import {
    FileText,
    Shield,
    ChevronDown,
    ChevronUp,
    AlertCircle,
    Lock,
    Eye,
    Database,
    Cookie,
    Mail,
    Calendar
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function LegalPages() {
    const [activePage, setActivePage] = useState("terms");
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const termsContent = {
        lastUpdated: "January 15, 2025",
        sections: [
            {
                id: "acceptance",
                title: "1. Şartların Kabulü",
                content: `Bu e-ticaret platformuna ("Site") erişerek ve kullanarak, bu sözleşmenin hüküm ve şartlarını kabul etmiş ve bunlara bağlı kalmayı taahhüt etmiş olursunuz. Bu şartları kabul etmiyorsanız, lütfen hizmetlerimizi kullanmayınız.

Bu Hüküm ve Koşullar, web sitemizi ve hizmetlerimizi kullanımınızı düzenler. Bu şartların bazı kısımlarını istediğimiz zaman değiştirme, düzenleme, ekleme veya çıkarma hakkımızı saklı tutarız. Lütfen değişiklikler için bu sayfayı düzenli olarak kontrol edin.`
            },
            {
                id: "account",
                title: "2. Kullanıcı Hesabı ve Kayıt",
                content: `Sitemizin belirli özelliklerine erişmek için bir hesap oluşturmanız gerekebilir. Şunları kabul edersiniz:

• Kayıt sırasında doğru, güncel ve eksiksiz bilgi sağlamak
• Hesap bilgilerinizi korumak ve derhal güncellemek
• Şifrenizin ve hesabınızın güvenliğini sağlamak
• Hesabınız altındaki tüm faaliyetlerin sorumluluğunu kabul etmek
• Yetkisiz kullanım durumunda bizi derhal bilgilendirmek

Bu şartları ihlal eden veya dolandırıcılık faaliyetlerinde bulunan hesapları askıya alma veya sonlandırma hakkımızı saklı tutarız.`
            },
            {
                id: "products",
                title: "3. Ürünler ve Hizmetler",
                content: `Ürün Açıklamaları: Doğru ürün açıklamaları, görselleri ve fiyatlandırmaları sağlamak için çabalıyoruz. Ancak, ürün açıklamalarının veya diğer içeriklerin doğru, eksiksiz, güvenilir, güncel veya hatasız olduğunu garanti etmiyoruz.

Fiyatlandırma: Tüm fiyatlar Türk Lirası cinsindendir ve önceden haber verilmeksizin değiştirilebilir. Fiyatları herhangi bir zamanda değiştirme hakkımızı saklı tutarız. Aksi belirtilmedikçe, gösterilen fiyatlara geçerli vergiler ve kargo ücretleri dahil değildir.

Mevcutluk: Ürün stok durumu önceden haber verilmeksizin değiştirilebilir. Herhangi bir zamanda ürün miktarlarını sınırlama veya üretimi durdurma hakkımızı saklı tutarız.`
            },
            {
                id: "orders",
                title: "4. Siparişler ve Ödeme",
                content: `Sipariş Kabulü: Sipariş onayı almanız, siparişinizi kabul ettiğimiz anlamına gelmez. Siparişinizi herhangi bir nedenle kabul etme veya reddetme hakkımızı saklı tutarız.

Ödeme Yöntemleri: Sitemizde gösterilen yaygın kredi kartlarını, banka kartlarını ve mobil ödemeleri kabul ediyoruz. Siparişler işlenmeden önce ödemenin tamamı alınmalıdır.

Ödeme Güvenliği: Tüm ödeme işlemleri güvenli ödeme ağ geçitleri aracılığıyla gerçekleştirilir. Kredi kartı bilgilerinizin tamamı sunucularımızda saklanmamaktadır.

Sipariş İptali: Siparişinizi verdikten sonraki 24 saat içinde iptal edebilirsiniz. Bu sürenin sonunda, sipariş işlendiyse veya kargoya verildiyse iptal işlemi mümkün olmayabilir.`
            },
            {
                id: "shipping",
                title: "5. Kargo ve Teslimat",
                content: `Kargo Süreleri: Tahmini teslimat süreleri ödeme sırasında belirtilir, ancak garanti edilmez. Kargo şirketlerinden veya gümrükten kaynaklanan gecikmelerden sorumlu değiliz.

Kargo Ücretleri: Kargo ücretleri, siparişinizin ağırlığına, boyutlarına ve varış noktasına göre hesaplanır. Bu ücretler, satın alma işleminizi tamamlamadan önce görüntülenecektir.

Uluslararası Kargo: Uluslararası siparişler, alıcının sorumluluğunda olan gümrük vergileri, vergiler ve harçlara tabi olabilir.

Kayıp Riski: Sitemizden satın alınan tüm ürünler bir kargo sözleşmesi uyarınca yapılır. Ürünlerin kayıp riski ve mülkiyeti, kargo şirketine teslim edildiğinde size geçer.`
            },
            {
                id: "returns",
                title: "6. İade ve Geri Ödemeler",
                content: `İade Politikası: Teslimat tarihinden itibaren 30 gün içinde çoğu ürünü iade ederek paranızın tamamını geri alabilirsiniz. Ürünlerin kullanılmamış, orijinal durumunda ve orijinal ambalajında ​​olması gerekmektedir.

İade Edilemeyen Ürünler: Aşağıdakiler dahil olmak üzere bazı ürünler iade edilemez:
• Kişiselleştirilmiş veya özel yapım ürünler
• Dijital ürünler
• Kişisel veya hijyenik ürünler
• Bozulabilir ürünler

İade Süreci: İade başlatmak için sipariş numaranızla müşteri hizmetleri ekibimizle iletişime geçin. İade talimatları ve iade yetkilendirme numarası sağlayacağız.

İadeler: İadeler, iade edilen ürünü teslim alıp inceledikten sonra 5-10 iş günü içinde orijinal ödeme yönteminize işlenecektir. İade bizim hatamızdan kaynaklanmadığı sürece kargo masrafları iade edilmez.

Hasarlı veya Kusurlu Ürünler: Hasarlı veya kusurlu bir ürün aldıysanız, derhal bizimle iletişime geçin. Kargo masrafları dahil olmak üzere değişim veya tam para iadesi için gerekli düzenlemeleri yapacağız.`
            },
            {
                id: "intellectual",
                title: "7. Fikri Mülkiyet",
                content: `Bu Sitedeki metin, grafik, logo, görsel, ses klipleri, dijital indirmeler ve yazılımlar dahil tüm içerik, şirketimizin veya içerik sağlayıcılarının mülkiyetindedir ve uluslararası telif hakkı yasalarıyla korunmaktadır.

Şunları yapamazsınız:
• İçeriğimizi çoğaltmak, dağıtmak veya türev çalışmalar oluşturmak
• İçeriğimizi izinsiz ticari amaçlarla kullanmak
• Telif hakkı veya mülkiyet bildirimlerini kaldırmak
• İçeriği başka bir kişiye aktarmak veya başka bir sunucuda "yansıtmak"

Sınırlı Lisans: Size, Siteye kişisel, ticari olmayan amaçlarla erişim ve kullanım için sınırlı, münhasır olmayan ve devredilemez bir lisans veriyoruz.`
            },
            {
                id: "prohibited",
                title: "8. Yasaklanmış Faaliyetler",
                content: `Aşağıdakileri yapmamayı kabul edersiniz:
• Siteyi herhangi bir yasa dışı amaçla veya herhangi bir yasayı ihlal edecek şekilde kullanma
• Herhangi bir kişi veya kurumu taklit etme
• Siteye veya sunuculara müdahale etme veya bunları bozma
• Sitenin herhangi bir bölümüne yetkisiz erişim sağlama girişiminde bulunma
• Siteye izinsiz erişmek için otomatik sistemler kullanma
• Diğer kullanıcılar hakkında izinsiz bilgi toplama
• Zararlı, tehdit edici veya saldırgan içerik yayınlama veya iletme
• İtibarımıza veya işimize zarar verebilecek herhangi bir faaliyette bulunma`
            },
            {
                id: "disclaimers",
                title: "9. Feragatnameler ve Sorumluluğun Sınırlandırılması",
                content: `Sorumluluk Reddi: Site ve tüm ürün ve hizmetler, pazarlanabilirlik, belirli bir amaca uygunluk ve ihlal edilmeme garantileri dahil ancak bunlarla sınırlı olmamak üzere, açık veya zımni hiçbir garanti olmaksızın "olduğu gibi" sunulmaktadır.

Sorumluluğun Sınırlandırılması: Yasaların izin verdiği azami ölçüde, dolaylı, tesadüfi, özel, sonuçsal veya cezai zararlardan veya doğrudan veya dolaylı olarak meydana gelen herhangi bir kar veya gelir kaybından veya herhangi bir veri, kullanım, itibar kaybı veya diğer maddi olmayan kayıplardan sorumlu olmayacağız.

Azami Sorumluluk: Siteyi kullanımınızdan kaynaklanan herhangi bir talep için size karşı toplam sorumluluğumuz, sorumluluğa yol açan eylemden önceki on iki (12) ay içinde bize ödediğiniz tutarı aşmayacaktır.`
            },
            {
                id: "indemnification",
                title: "10. Tazminat",
                content: `Şirketimizi, yöneticilerimizi, müdürlerimizi, çalışanlarımızı, temsilcilerimizi ve bağlı kuruluşlarımızı, aşağıdakilerden kaynaklanan veya bunlarla herhangi bir şekilde bağlantılı olan her türlü talep, yükümlülük, zarar, kayıp ve masraftan (makul avukatlık ücretleri dahil) tazmin etmeyi, savunmayı ve zarar görmemelerini sağlamayı kabul edersiniz:

• Siteye erişiminiz veya Siteyi kullanımınız
• Bu Şartlar ve Koşulları ihlal etmeniz
• Başka bir tarafın herhangi bir hakkını ihlal etmeniz
• Site ile bağlantılı davranışlarınız`
            },
            {
                id: "termination",
                title: "11. Fesih",
                content: `Bu Şartlar ve Koşullar'ın ihlali de dahil olmak üzere herhangi bir nedenle, önceden bildirimde bulunmaksızın veya herhangi bir yükümlülük altına girmeden hesabınızı ve Site'ye erişiminizi derhal feshetme veya askıya alma hakkımızı saklı tutarız.

Fesih halinde:
• Site'yi kullanma hakkınız derhal sona erecektir.
• Mülkiyet hükümleri, garanti feragatnameleri ve sorumluluk sınırlamaları dahil olmak üzere, fesih sonrasında geçerliliğini koruması gereken tüm hükümler geçerliliğini koruyacaktır.`
            },
            {
                id: "governing",
                title: "12. Geçerli Hukuk ve Uyuşmazlıkların Çözümü",
                content: `Bu Şartlar, kanunlar ihtilafı hükümleri dikkate alınmaksızın [Yargı Bölgeniz] yasalarına tabi olacak ve bu yasalara göre yorumlanacaktır.

Uyuşmazlıkların Çözümü: Bu Şartlar veya Site kullanımınızdan kaynaklanan tüm uyuşmazlıklar öncelikle iyi niyetli müzakereler yoluyla çözülmeye çalışılacaktır. Müzakereler başarısız olursa, uyuşmazlıklar Amerikan Tahkim Derneği kurallarına uygun olarak bağlayıcı tahkim yoluyla çözülecektir.

Toplu Dava Feragati: Bizimle olan uyuşmazlıkları bireysel olarak çözmeyi kabul ediyor ve toplu davalara veya toplu tahkime katılma hakkınızdan feragat ediyorsunuz.`
            },
            {
                id: "contact",
                title: "13. İletişim Bilgileri",
                content: `Bu Şartlar ve Koşullar hakkında herhangi bir sorunuz varsa lütfen bizimle iletişime geçin:

E-posta: legal@yourcompany.com
Telefon: +1 (555) 123-4567
Adres: 123 Business Street, San Francisco, CA 94105, Amerika Birleşik Devletleri

Müşteri Hizmetleri Saatleri: Pazartesi - Cuma, 09:00 - 18:00 PST`
            }
        ]
    };

    const privacyContent = {
        lastUpdated: "January 15, 2025",
        sections: [
            {
                id: "introduction",
                title: "1. Introduction",
                icon: Shield,
                content: `Gizlilik Politikamıza hoş geldiniz. Kişisel bilgilerinizi ve gizlilik hakkınızı korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde ve hizmetlerimizi kullandığınızda bilgilerinizi nasıl topladığımızı, kullandığımızı, ifşa ettiğimizi ve koruduğumuzu açıklamaktadır.

Lütfen bu gizlilik politikasını dikkatlice okuyun. Sitemizi kullanarak, bilgilerin bu politikaya uygun olarak toplanmasını ve kullanılmasını kabul etmiş olursunuz. Politikalarımızı ve uygulamalarımızı kabul etmiyorsanız, lütfen hizmetlerimizi kullanmayın.`
            },
            {
                id: "information",
                title: "2. Topladığımız Bilgiler",
                icon: Database,
                content: `Sağladığınız Kişisel Bilgiler:
• Adınız, e-posta adresiniz, telefon numaranız
• Fatura ve teslimat adresleriniz
• Ödeme bilgileriniz (üçüncü taraf ödeme işlemcileri aracılığıyla güvenli bir şekilde işlenir)
• Hesap kimlik bilgileriniz (kullanıcı adı, şifre)
• Sipariş geçmişi ve tercihleriniz
• İletişim tercihleriniz
• Ürün incelemeleri ve puanlamalarınız
• Müşteri hizmetleri yazışmalarınız

Otomatik Olarak Toplanan Bilgiler:
• IP adresi ve cihaz bilgileri
• Tarayıcı türü ve sürümü
• İşletim sistemi
• Ziyaret edilen sayfalar ve sayfalarda geçirilen süre
• Yönlendiren web sitesi adresleri
• Erişim tarihi ve saati
• Çerezler ve izleme teknolojileri verileri

Üçüncü Taraflardan Gelen Bilgiler:
• Sosyal medya profil bilgileriniz (hesabınızı bağlarsanız)
• Ödeme işlemcilerinden gelen ödeme doğrulama bilgileri
• Güvenlik hizmeti sağlayıcılarından gelen dolandırıcılık önleme verileri`
            },
            {
                id: "usage",
                title: "3. Bilgilerinizi Nasıl Kullanıyoruz?",
                icon: Eye,
                content: `Bilgilerinizi şu amaçlarla kullanıyoruz:

Hizmet Sunumu:
• Siparişlerinizi işlemek ve yerine getirmek
• Sipariş onayları ve kargo bildirimleri göndermek
• Müşteri desteği sağlamak
• Hesabınızı ve tercihlerinizi yönetmek

İletişim:
• Promosyon e-postaları ve bültenler göndermek (onayınızla)
• Hizmetlerimizdeki değişiklikler hakkında sizi bilgilendirmek
• Sorularınıza ve taleplerinize yanıt vermek
• Anketler düzenlemek ve geri bildirim toplamak

İşletme Operasyonları:
• Deneyiminizi iyileştirmek ve kişiselleştirmek
• Kullanım kalıplarını ve trendlerini analiz etmek
• Yeni ürün ve hizmetler geliştirmek
• Dolandırıcılığı önlemek ve güvenliği artırmak
• Yasal yükümlülüklere uymak

Pazarlama:
• Kişiselleştirilmiş reklamlar göstermek
• Size ilgili ürün önerileri göndermek
• Pazarlama kampanyaları ve promosyonları yürütmek
• Pazarlama etkinliğini analiz etmek`
            },
            {
                id: "sharing",
                title: "4. Bilgilerinizi Nasıl Paylaşıyoruz?",
                icon: AlertCircle,
                content: `Bilgilerinizi şunlarla paylaşabiliriz:

Hizmet Sağlayıcıları:
• İşlem işleme için ödeme işlemcileri
• Sipariş teslimatı için kargo şirketleri
• İletişim için e-posta hizmeti sağlayıcıları
• Kullanım modellerini anlamak için analiz sağlayıcıları
• Veri barındırma için bulut depolama sağlayıcıları
• Müşteri hizmetleri platformları

İşletme Devirleri:
• Birleşme, satın alma veya varlık satışlarıyla bağlantılı olarak
• İflas veya benzeri işlemler sırasında

Yasal Gereklilikler:
• Yasalara, düzenlemelere veya yasal süreçlere uymak için
• Resmi taleplere yanıt vermek için
• Haklarımızı, mülkiyetimizi veya güvenliğimizi korumak için
• Şart ve koşullarımızı uygulamak için

Onayınızla:
• Bilgi paylaşımı için bize açıkça yetki verdiğinizde
• Özel olarak onayladığınız amaçlar için

Kişisel bilgilerinizi üçüncü taraflara pazarlama amaçları doğrultusunda satmıyoruz.`
            },
            {
                id: "cookies",
                title: "5. Çerezler ve İzleme Teknolojileri",
                icon: Cookie,
                content: `Deneyiminizi geliştirmek için çerezler ve benzeri izleme teknolojileri kullanıyoruz:

Kullandığımız Çerez Türleri:

Temel Çerezler:
• Web sitesi işlevselliği için gereklidir
• Alışveriş sepeti ve ödeme gibi temel özellikleri etkinleştirir
• Sitenin çalışması için gerekli olduklarından devre dışı bırakılamazlar

Analiz Çerezleri:
• Ziyaretçilerin sitemizi nasıl kullandığını anlamamıza yardımcı olur
• Sayfa görüntülemelerini, tıklamaları ve gezinme modellerini izler
• Web sitesi performansını iyileştirmek için kullanılır

Pazarlama Çerezleri:
• Tercihlerinizi ve ilgi alanlarınızı hatırlar
• Kişiselleştirilmiş reklamlar görüntüler
• Reklam kampanyasının etkinliğini ölçer

Çerez Yönetimi:
Çerezleri tarayıcı ayarlarınız üzerinden kontrol edebilirsiniz. Ancak, çerezleri devre dışı bırakmak Sitemizin belirli özelliklerini kullanma yeteneğinizi sınırlayabilir.

Üçüncü Taraf Çerezleri:
Üçüncü taraf hizmet sağlayıcılarının reklam ve analiz amacıyla Sitemize çerez yerleştirmesine izin verebiliriz. Bu üçüncü tarafların kendi gizlilik politikaları vardır.`
            },
            {
                id: "security",
                title: "6. Veri Güvenliği",
                icon: Lock,
                content: `Kişisel bilgilerinizi korumak için uygun teknik ve organizasyonel güvenlik önlemlerini uyguluyoruz:

Güvenlik Önlemleri:
• Veri aktarımı için SSL/TLS şifrelemesi
• PCI-DSS uyumlu sağlayıcılar aracılığıyla güvenli ödeme işlemleri
• Düzenli güvenlik denetimleri ve güvenlik açığı değerlendirmeleri
• Erişim kontrolleri ve kimlik doğrulama gereksinimleri
• Veri koruma konusunda çalışan eğitimi
• Olay müdahale prosedürleri

Veri İhlali Bildirimi:
Kişisel bilgilerinizi tehlikeye atabilecek bir veri ihlali durumunda, yasaların gerektirdiği şekilde sizi ve ilgili makamları bilgilendireceğiz.

Sınırlamalar:
Bilgilerinizi korumak için çaba göstersek de, internet üzerinden veya elektronik ortamda hiçbir aktarım yöntemi %100 güvenli değildir. Mutlak güvenliği garanti edemeyiz.`
            },
            {
                id: "retention",
                title: "7. Veri Saklama",
                icon: Calendar,
                content: `Kişisel bilgilerinizi aşağıdaki amaçlarla gerektiği sürece saklarız:
• Bu gizlilik politikasında belirtilen amaçları yerine getirmek
• Yasal, muhasebe veya raporlama gerekliliklerine uymak
• Anlaşmazlıkları çözmek ve sözleşmelerimizi uygulamak
• Müşteri desteği sağlamak

Saklama Süreleri:
• Hesap bilgileri: Hesabın geçerlilik süresi artı 3 yıl
• Sipariş geçmişi: Vergi ve muhasebe amaçları için 7 yıl
• Pazarlama verileri: Abonelikten çıkana veya onayınızı geri çekene kadar
• Analiz verileri: Genellikle 26 ay

Veri Silme:
Yasal saklama gerekliliklerine tabi olarak, kişisel bilgilerinizin silinmesini istediğiniz zaman talep edebilirsiniz.`
            },
            {
                id: "rights",
                title: "8. Gizlilik Haklarınız",
                icon: Shield,
                content: `Bulunduğunuz yere bağlı olarak aşağıdaki haklara sahip olabilirsiniz:

Erişim ve Taşınabilirlik:
• Kişisel bilgilerinize erişim talebinde bulunma
• Verilerinizin taşınabilir bir formatta bir kopyasını alma

Düzeltme ve Güncelleme:
• Yanlış bilgilerin düzeltilmesini talep etme
• Hesap bilgilerinizi istediğiniz zaman güncelleme

Silme:
• Kişisel bilgilerinizin silinmesini talep etme
• Hesabınızı kapatma

Çıkış Hakları:
• Pazarlama e-postalarından aboneliği iptal etme
• Kişiselleştirilmiş reklamlardan çıkma
• Tarayıcı ayarları aracılığıyla çerezleri devre dışı bırakma

Kısıtlama ve İtiraz:
• İşlemenin kısıtlanmasını talep etme
• Belirli işleme türlerine itiraz etme

Ayrımcılık Yapmama:
• Gizlilik haklarınızı kullandığınız için size karşı ayrımcılık yapmayacağız

Bu hakları kullanmak için lütfen İletişim bölümünde verilen bilgileri kullanarak bizimle iletişime geçin.`
            },
            {
                id: "children",
                title: "9. Çocukların Gizliliği",
                content: `Hizmetlerimiz 18 yaşın altındaki bireylere yönelik değildir. Çocuklardan bilerek kişisel bilgi toplamıyoruz.

Ebeveyn izni olmadan bir çocuktan kişisel bilgi topladığımızı fark edersek, bu bilgileri silmek için gerekli adımları atacağız.

Çocuklarının bize kişisel bilgi verdiğine inanan ebeveynler veya veliler derhal bizimle iletişime geçmelidir.`
            },
            {
                id: "international",
                title: "10. Uluslararası Veri Transferleri",
                content: `Bilgileriniz, ikamet ettiğiniz ülke dışındaki ülkelere aktarılabilir ve bu ülkelerde işlenebilir. Bu ülkelerin farklı veri koruma yasaları olabilir.

Verileri uluslararası olarak aktarırken uygun güvenlik önlemlerinin alındığından emin oluruz:
• Düzenleyici kurumlar tarafından onaylanmış standart sözleşme maddeleri
• Gizlilik Kalkanı sertifikası (uygulanabilir olduğu durumlarda)
• Belirli aktarımlar için onay

Hizmetlerimizi kullanarak, bilgilerinizin ikamet ettiğiniz ülke dışındaki ülkelere aktarılmasına onay vermiş olursunuz.`
            },
            {
                id: "changes",
                title: "11. Bu Gizlilik Politikasındaki Değişiklikler",
                content: `Uygulamalarımızdaki veya yasal gerekliliklerdeki değişiklikleri yansıtmak için bu Gizlilik Politikasını zaman zaman güncelleyebiliriz.

Önemli değişiklikler hakkında sizi şu yollarla bilgilendireceğiz:
• Yeni Gizlilik Politikasını bu sayfada yayınlayarak
• "Son Güncelleme" tarihini güncelleyerek
• Size bir e-posta bildirimi göndererek (önemli değişiklikler için)
• Web sitemizde belirgin bir bildirim yayınlayarak

Bilgilerinizi nasıl koruduğumuz hakkında bilgi sahibi olmak için bu Gizlilik Politikasını düzenli olarak incelemenizi öneririz.`
            },
            {
                id: "contact-privacy",
                title: "12. Bizimle İletişime Geçin",
                icon: Mail,
                content: `Bu Gizlilik Politikası veya veri uygulamalarımızla ilgili sorularınız, endişeleriniz veya talepleriniz varsa lütfen bizimle iletişime geçin:

Veri Koruma Görevlisi:
E-posta: privacy@yourcompany.com
Telefon: +1 (555) 123-4567
Adres: 123 Business Street, San Francisco, CA 94105, Amerika Birleşik Devletleri

Yanıt Süresi: Talebinize 30 gün içinde yanıt vereceğiz.

Şikayetler: Endişelerinizi yeterince ele almadığımızı düşünüyorsanız, yerel veri koruma yetkilinize şikayette bulunma hakkınız vardır.`
            }
        ]
    };

    const renderTermsPage = () => (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <div className="flex items-center mb-6">
                    <FileText className="text-blue-600 mr-4" size={48} />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Şartlar ve Koşullar</h1>
                        <p className="text-gray-600 mt-2">Son Güncelleme: 13.10.2025</p>
                    </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
                    <p className="text-blue-900">
                        <strong>Önemli: </strong>Hizmetlerimizi kullanmadan önce lütfen bu şartları dikkatlice okuyun.
                        Web sitemizi kullanarak, bu şartlar ve koşullara bağlı kalmayı kabul etmiş olursunuz.
                    </p>
                </div>

                <div className="space-y-6">
                    {termsContent.sections.map((section) => (
                        <div key={section.id} className="border-b border-gray-200 pb-6">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex items-center justify-between text-left"
                            >
                                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                                {expandedSection === section.id ? (
                                    <ChevronUp className="text-gray-400" size={24} />
                                ) : (
                                    <ChevronDown className="text-gray-400" size={24} />
                                )}
                            </button>
                            {expandedSection === section.id && (
                                <div className="mt-4 text-gray-700 whitespace-pre-line leading-relaxed">
                                    {section.content}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
                <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-semibold mb-2">Sorularınız mı var?</h3>
                <p className="text-gray-600 mb-4">
                    Bu Şartlar ve Koşullar hakkında herhangi bir sorunuz varsa lütfen hukuk ekibimizle iletişime geçin.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Bizimle İletişime Geçin
                </button>
            </div>
        </div>
    );

    const renderPrivacyPage = () => (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <div className="flex items-center mb-6">
                    <Shield className="text-green-600 mr-4" size={48} />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Gizlilik Politikası</h1>
                        <p className="text-gray-600 mt-2">Son Güncelleme: 13.10.2025</p>
                    </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-8">
                    <p className="text-green-900">
                        <strong>Gizliliğiniz Önemlidir:</strong> Kişisel bilgilerinizi korumayı ve verilerinizi nasıl topladığımız, kullandığımız ve paylaştığımız konusunda şeffaf olmayı taahhüt ediyoruz.
                    </p>
                </div>

                <div className="space-y-6">
                    {privacyContent.sections.map((section) => (
                        <div key={section.id} className="border-b border-gray-200 pb-6">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex items-center justify-between text-left"
                            >
                                <div className="flex items-center">
                                    {section.icon && <section.icon className="text-green-600 mr-3" size={24} />}
                                    <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                                </div>
                                {expandedSection === section.id ? (
                                    <ChevronUp className="text-gray-400" size={24} />
                                ) : (
                                    <ChevronDown className="text-gray-400" size={24} />
                                )}
                            </button>
                            {expandedSection === section.id && (
                                <div className="mt-4 text-gray-700 whitespace-pre-line leading-relaxed">
                                    {section.content}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <Lock className="mx-auto text-blue-600 mb-3" size={32} />
                    <h3 className="font-semibold mb-2">Güvenli ve Şifreli</h3>
                    <p className="text-sm text-gray-600">Verileriniz endüstri standardı şifrelemeyle korunmaktadır</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <Shield className="mx-auto text-green-600 mb-3" size={32} />
                    <h3 className="font-semibold mb-2">Haklarınız Korunuyor</h3>
                    <p className="text-sm text-gray-600">Kişisel bilgileriniz üzerinde tam kontrole sahipsiniz</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <Eye className="mx-auto text-purple-600 mb-3" size={32} />
                    <h3 className="font-semibold mb-2">Şeffaflık</h3>
                    <p className="text-sm text-gray-600">Verilerinizi nasıl kullandığımız konusunda net bir fikre sahibiz</p>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
                <Mail className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-semibold mb-2">Gizlilik Sorularınız mı var?</h3>
                <p className="text-gray-600 mb-4">
                    Gizlilikle ilgili sorularınız için Veri Koruma Görevlimizle iletişime geçin.
                </p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                    Bizimle İletişime Geçin
                </button>
            </div>
        </div>
    );

    return (
        <div>
            <Header />
            <div className="py-8 bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4">
                    {/* Page Toggle */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="bg-white rounded-lg shadow-md p-2 flex">
                            <button
                                onClick={() => setActivePage("terms")}
                                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                                    activePage === "terms"
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                <FileText className="inline mr-2" size={20} />
                                Şartlar ve Koşullar
                            </button>
                            <button
                                onClick={() => setActivePage("privacy")}
                                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                                    activePage === "privacy"
                                        ? "bg-green-600 text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                <Shield className="inline mr-2" size={20} />
                                Gizlilik Polikası
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    {activePage === "terms" ? renderTermsPage() : renderPrivacyPage()}
                </div>
            </div>
            <Footer />
        </div>
    );
}