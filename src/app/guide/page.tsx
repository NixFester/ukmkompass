'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Header from '../component/Header';
import Kaki from '../component/Kaki';
import BotNav from '../component/BotNav';
import Line from '../component/Line';

export default function Page() {
    const router = useRouter();

    return (
        <div>
                    <div className=" flex justify-center">
                    <div className=" lg:w-11/12 lg:mx-2 w-full">
                        <Header type="pojokSastra" />
                        <div className=" flex flex-row lg:justify-between justify-center mx-4 lg:mx-20 mt-10">
                        <button
                            className=" lg:text-2xl lg:block hidden cursor-pointer"
                            onClick={() => router.back()}
                        >
                            Kembali
                        </button>
                        <span className=" lg:text-4xl text-5xl ">
                            <b>Panduan</b>
                        </span>
                        </div>
                        <div className=" w-full lg:p-16 p-2 flex justify-center flex-col has-[h1]:">
                            <Line />
                            <h1 className=" lg:text-8xl text-5xl font-bold my-8">Tata Cara Menggunakan Website ini</h1>
                            <Line />
                            <div className=" flex flex-col lg:px-4 mt-10 text-xl">
                                <p className=' text-xl'>Website ini dirancang agar mudah digunakan di komputer/laptop maupun ponsel. Meskipun tata letak halaman utama berbeda, fitur login, dashboard, dan lainnya tetap seragam. Berikut panduan lengkapnya:</p>

                                <h2 className='text-4xl mt-4'>Daftar Isi</h2>
                                <Line width='w-[500px]' />

                                <ol className='flex gap-5 flex-col my-4 text-3xl text-blue-600'>
                                    <li className=''><Link href="#pc">1. Menggunakan komputer/laptop</Link></li>
                                    <li><Link href="#hp"> 2. Menggunakan Ponsel</Link></li>
                                </ol>

                                <section id="pc">
                                <h2  className=' text-6xl text-center my-4 font-bold'>Menggunakan Komputer/Laptop</h2>
                                <Line width='my-5'/>


                                <h3 className=' text-3xl my-6 font-semibold'>1. Navigasi Awal</h3>
                                <Image className='my-5' src="/langka1.png" alt="Navigasi Awal" width={600} height={400} />
                                <p className=' text-xl'>Di pojok kanan atas layar, Anda akan menemukan menu navigasi: Beranda, Artikel, dan Pojok Sastra.</p>
                                <ul className='text-xl flex flex-col gap-2 pl-6 list-disc list-inside marker:text-black marker:content-["●\00a0\00a0\00a0\00a0"] my-6'>
                                    <li><b>Beranda:</b> Menampilkan semua kategori.</li>
                                    <li><b>Artikel dan Pojok Sastra:</b> Menampilkan kategori khusus.</li>
                                </ul>
                                <p className=' text-xl'>Klik Log in untuk mulai menggunakan website secara penuh.</p>

                                <h3 className=' text-3xl my-6 font-semibold'>2. Masuk dengan Akun Google</h3>
                                <Image className='my-5' src="/langka2.png" alt="Masuk dengan Akun Google" width={600} height={400} />
                                <p className=' text-xl'>Anda akan diarahkan ke halaman login yang simpel. Klik Login dengan Google, lalu masukkan akun Google Anda.</p>

                                <h3 className=' text-3xl my-6 font-semibold'>3. Setelah Login</h3>
                                <Image className='my-5' src="/langka3.png" alt="Setelah Login" width={600} height={400} />
                                <ul className='text-xl flex flex-col gap-2 pl-6 list-disc list-inside marker:text-black marker:content-["●\00a0\00a0\00a0\00a0"] my-6'>
                                    <li>Informasi akun Anda akan muncul di situs, seperti nama dan email.</li>
                                    <li>Kini Anda dapat berkomentar di setiap postingan.</li>
                                    <li>Klik Kembali untuk kembali ke halaman beranda.</li>
                                </ul>

                                <h3 className=' text-3xl my-6 font-semibold'>4. Tombol Login Berubah Menjadi Akun</h3>
                                <Image className='my-5' src="/langka4.png" alt="Tombol Login Berubah Menjadi Akun" width={600} height={400} />
                                <p className=' text-xl'>Tombol Log in di pojok kanan atas akan berubah menjadi Akun. Klik tombol tersebut untuk mengakses lebih banyak fitur.</p>

                                <h3 className=' text-3xl my-6 font-semibold'>5. Dashboard dan Fitur Akun</h3>
                                <Image className='my-5' src="/langka5.png" alt="Dashboard dan Fitur Akun" width={600} height={400} />
                                <ul className='text-xl flex flex-col gap-2 pl-6 list-disc list-inside marker:text-black marker:content-["●\00a0\00a0\00a0\00a0"] my-6'>
                                    <li>Mengubah username atau deskripsi akun.</li>
                                    <li>Menulis artikel (berita atau sastra).</li>
                                    <li>Mengakses navigasi tambahan di sisi kiri, seperti kembali ke Beranda atau Log out.</li>
                                </ul>

                                <h3 className=' text-3xl my-6 font-semibold'>6. Menulis Artikel</h3>
                                <Image className='my-5' src="/langka9.png" alt="Menulis Artikel" width={600} height={400} />
                                <p className=' text-xl'>
                                    <b>Pilih Tulis Berita</b> untuk menulis artikel. Unggah gambar dengan klik Cari Gambar (maksimal ukuran 2 MB).
                                </p>
                                <Image className='my-5' src="/langka6.png" alt="Menulis Artikel 2" width={600} height={400} />
                                <p className=' text-xl'>Isi judul dan konten artikel, lalu klik Kirim Artikel.</p>

                                <h3 className=' text-3xl my-6 font-semibold'>7. Proses Setelah Pengiriman</h3>
                                <Image className='my-5' src="/langka7.png" alt="Proses Setelah Pengiriman" width={600} height={400} />
                                <p className=' text-xl'>Notifikasi akan muncul bahwa artikel Anda telah berhasil disimpan. Jika terjadi kendala, segera hubungi organisasi terkait.</p>

                                <h3 className=' text-3xl my-6 font-semibold'>8. Persetujuan Artikel</h3>
                                <Image className='my-5' src="/langka8.png" alt="Persetujuan Artikel" width={600} height={400} />
                                <p className=' text-xl'>
                                    Artikel Anda akan diperiksa oleh tim UKM KomPaSS. Setelah disetujui, artikel akan tampil di halaman utama.
                                </p>
                                </section>

                                <section id="hp">
                                <h2  className=' text-6xl text-center my-4 font-bold'>Menggunakan Ponsel</h2>
                                <Line width='my-5'/>

                                <h3 className=' text-3xl my-6 font-semibold'>1. Navigasi Awal</h3>
                                <Image className='my-5' src="/hp1.png" alt="Navigasi Awal" width={600} height={400} />
                                <p className=' text-xl'>
                                    Menu navigasi utama berada di bagian bawah layar. Anda akan menemukan tombol Login, Beranda, Artikel, dan Pojok
                                    Sastra.
                                </p>
                                <ul className='text-xl flex flex-col gap-2 pl-6 list-disc list-inside marker:text-black marker:content-["●\00a0\00a0\00a0\00a0"] my-6'>
                                    <li><b>Beranda:</b> Menampilkan semua kategori.</li>
                                    <li><b>Artikel dan Pojok Sastra:</b> Menampilkan kategori tertentu.</li>
                                </ul>
                                <p className=' text-xl'>Tekan Login untuk mulai menggunakan website.</p>

                                <h3 className=' text-3xl my-6 font-semibold'>2. Masuk dengan Akun Google</h3>
                                <Image className='my-5' src="/hp2.jpg" alt="Masuk dengan Akun Google" width={600} height={400} />
                                <p className=' text-xl'>Anda akan diarahkan ke halaman login yang simpel. Klik Login dengan Google, lalu masukkan akun Google Anda.</p>

                                <h3 className=' text-3xl my-6 font-semibold'>3. Setelah Login</h3>
                                <Image className='my-5' src="/hp3.jpg" alt="Setelah Login" width={600} height={400} />
                                <ul className='text-xl flex flex-col gap-2 pl-6 list-disc list-inside marker:text-black marker:content-["●\00a0\00a0\00a0\00a0"] my-6'>
                                    <li>Informasi akun Anda, seperti nama dan email, akan ditampilkan di situs.</li>
                                    <li>Kini Anda bisa memberikan komentar di setiap postingan.</li>
                                    <li>Klik tombol Kembali untuk kembali ke halaman beranda.</li>
                                </ul>

                                <h3 className=' text-3xl my-6 font-semibold'>4. Tombol Login Berubah Menjadi Akun</h3>
                                <Image className='my-5' src="/hp4.jpg" alt="Tombol Login Berubah Menjadi Akun" width={600} height={400} />
                                <p className=' text-xl'>Tombol Log in di pojok kanan bawah akan berubah menjadi Akun. Klik tombol tersebut untuk mengakses lebih banyak fitur.</p>

                                <h3 className=' text-3xl my-6 font-semibold'>5. Dashboard dan Fitur Akun</h3>
                                <Image className='my-5' src="/hp5.jpg" alt="Dashboard dan Fitur Akun" width={600} height={400} />
                                <ul className='text-xl flex flex-col gap-2 pl-6 list-disc list-inside marker:text-black marker:content-["●\00a0\00a0\00a0\00a0"] my-6'>
                                    <li>Mengubah username atau deskripsi akun.</li>
                                    <li>Menulis artikel (berita atau sastra).</li>
                                    <li>Mengakses navigasi tambahan di sisi kiri, seperti kembali ke Beranda atau Log out.</li>
                                </ul>

                                <h3 className=' text-3xl my-6 font-semibold'>6. Menulis Artikel</h3>
                                <Image className='my-5' src="/hp6.jpg" alt="Menulis Artikel" width={600} height={400} />
                                <p className=' text-xl'>
                                    <b>Pilih Tulis Berita</b> untuk menulis artikel. Unggah gambar dengan klik Cari Gambar (maksimal ukuran 2 MB).
                                </p>
                                <Image className='my-5' src="/hp7.jpg" alt="Menulis Artikel 2" width={600} height={400} />
                                <p className=' text-xl'>Isi judul dan konten artikel, lalu klik Kirim Artikel.</p>

                                <h3 className=' text-3xl my-6 font-semibold'>7. Proses Setelah Pengiriman</h3>
                                <Image className='my-5' src="/hp8.jpg" alt="Proses Setelah Pengiriman" width={600} height={400} />
                                <p className=' text-xl'>Notifikasi akan muncul bahwa artikel Anda telah berhasil disimpan. Jika terjadi kendala, segera hubungi organisasi terkait.</p>

                                <h3 className=' text-3xl my-6 font-semibold'>8. Persetujuan Artikel</h3>
                                <Image className='my-5' src="/hp9.jpg" alt="Persetujuan Artikel" width={600} height={400} />
                                <p className=' text-xl'>
                                    Artikel Anda akan diperiksa oleh tim UKM KomPaSS. Setelah disetujui, artikel akan tampil di halaman utama.
                                </p>
                                </section>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div
                        className={
                        " w-fit my-5 mx-auto bg-white p-8 mt-5 flex lg:flex-row flex-col justify-center shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-lg transition-all "
                        }
                    >
                        <div className="lg:relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        
                        <Image src={'/unnamed.jpg'} alt="gambar" width={96} height={96} className="lg:absolute w-20 h-20 text-gray-400 ">
                
                        </Image>
                        </div>
                        <div className=" lg:max-w-96 mt-4 lg:mt-0 lg:ml-5">
                        <p>
                            Penulis:
                        </p>
                        <p className=" text-3xl">
                            <b>Abi</b>
                        </p>
                        <p className=" text-2xl">Pembuat Website</p>
                        </div>
                    </div>
                    <Kaki />
                    <BotNav />
                </div>
        
    );
}
