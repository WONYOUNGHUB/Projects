package com.zumuniyo.main.controller;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.zumuniyo.main.dto.LocationDTO;
import com.zumuniyo.main.dto.MemberDTO;
import com.zumuniyo.main.dto.Memtype;
import com.zumuniyo.main.dto.ShopCategory;
import com.zumuniyo.main.dto.ShopDTO;
import com.zumuniyo.main.dto.ShopStatus;
import com.zumuniyo.main.repository.LocationRepository;
import com.zumuniyo.main.repository.MemberRepository;
import com.zumuniyo.main.repository.ShopRepository;

import lombok.extern.java.Log;

@Log
@RestController
@RequestMapping("/shop/*")
public class ShopController {

	@Autowired
	ShopRepository shopRepo;
	
	@Autowired
	LocationRepository locationRepository;
	
	@Autowired
	MemberRepository memberRepository;


	@GetMapping("/shopTest")
	public String shopTest() {
		return "도착";
	}
//	shopListByMember
	@GetMapping("/shopList")
	public List<ShopDTO> shopList() {
		List<ShopDTO> shopList = (List<ShopDTO>) shopRepo.findAll(Sort.by(Sort.Direction.DESC, "shopRegdate"));
		return shopList;
	}
	
	@GetMapping("/shopListByMem")
	public List<ShopDTO> shopListByMem(HttpServletRequest request) {
		List<ShopDTO> shoplist = new ArrayList<>();
		
		
		MemberDTO mem = (MemberDTO) request.getSession().getAttribute("member"); 
		if (mem == null) return shoplist;
		if(mem.getMemType()!= Memtype.사업자회원) return shoplist;	
		
		ShopStatus status =  ShopStatus.활성;
		 
		List<ShopDTO> shopList = shopRepo.findByMemberAndShopStatusOrderByShopRegdateDesc(mem,status);
		return shopList;
	}
	
	@GetMapping("/shopListByseq/{seq}")
	public ShopDTO shopInfo(@PathVariable Long seq) {
		System.out.println("값 들어옴");
//		List<ShopDTO> shopList = (List<ShopDTO>) shopRepo.findAll(Sort.by(Sort.Direction.DESC, "shopRegdate"));
		ShopDTO shop =  shopRepo.findById(seq).get();	
		
		
		return shop;
	}
	
//	@GetMapping("/shopListBymem")
//	public List<ShopDTO> shopListBymem(HttpServletRequest request) {
//		List<ShopDTO> shopList = new ArrayList<>();
//		if (request.getSession().getAttribute("member") != null) {
//			MemberDTO mem = (MemberDTO) request.getSession().getAttribute("member");
//			shopList = (List<ShopDTO>) shopRepo.findByMember(mem);
//		}
//		return shopList;
//	}

	@PostMapping("/shopInsert")
	public String shopInsert(ShopDTO shop, HttpServletRequest request, String locAddr, double locLat, double locLon) {
		
		System.out.println("샵입력 들어옴" + shop + "---" +  locAddr + locLat + locLon);
		LocationDTO locationDTO =  LocationDTO.builder()
				.locAddr(locAddr).locLat(locLat).locLon(locLon)
				.build();
		locationRepository.save(locationDTO);
		
		System.out.println("locationDTO :"+locationDTO);
		shop.setLocation(locationDTO);
		MemberDTO mem = (MemberDTO) request.getSession().getAttribute("member");
		if (mem == null) return "로그인 정보가 없습니다";
		if(mem.getMemType()!= Memtype.사업자회원) return "사업자 회원이 아닙니다";
		
		shop.setMember(mem);			
		shop.setShopStatus(ShopStatus.활성);
		ShopDTO result = shopRepo.save(shop);
		
		System.out.println(shop);
		System.out.println(result);
		
		return 	(result==null||result.getShopSeq()==null)?"실패":"성공";
	}
	
	//--------------------------------------------------------------------------------
	@PostMapping("/upload")
	public List<String> uploadImages( List<MultipartFile> images ,HttpServletRequest request){
		
		if(request.getSession().getAttribute("member")==null) return null;
		String memberSeq = ((MemberDTO)request.getSession().getAttribute("member")).getMemSeq().toString();
		
		List<String> fileNames = new ArrayList<String>();
		
		try {
			for(MultipartFile image : images) {
				
				String date = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()); 
				String oldImageName = image.getOriginalFilename();
				String extension =  oldImageName.indexOf(".")>=0?oldImageName.substring(oldImageName.lastIndexOf(".")+1):"";
				StringBuilder random = new StringBuilder("");
				for(int i=0;i<100;i++) random.append(((int)(Math.random()*10)));
				String newImageName = date+random+memberSeq+(extension.equals("")?"":".")+extension;
				
				String rootPath = System.getProperty("user.dir");
                Path DIR = Paths.get(rootPath+"\\src\\main\\resources\\static\\image");
				Files.createDirectories(DIR);
				Path imagePath = DIR.resolve(newImageName).normalize();
				if(Files.exists(imagePath)) return null;			
				image.transferTo(imagePath);
				fileNames.add(newImageName);
				
				log.info("[이미지업로드]: "+oldImageName+" => "+newImageName);
			}
			
		}catch(Exception e) {
			log.info("[이미지업로드] Exception 발생");
			System.out.println(e);
			return null;
		}
		
		return fileNames;
	}
	
	@GetMapping(value ="/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<byte[]> getImage(@PathVariable String imageName,HttpServletRequest request){

		try {
			
			String rootPath = System.getProperty("user.dir");
            Path DIR = Paths.get(rootPath+"\\src\\main\\resources\\static\\image");
			Path imagePath = DIR.resolve(imageName).normalize();
			if(!Files.exists(imagePath)) return null;
			
			InputStream imageStream = new FileInputStream(imagePath.toString());
			log.info("[이미지요청] "+imagePath.toString());
			ByteArrayOutputStream buffer = new ByteArrayOutputStream();
			int read;
			byte[] imageByteArray = new byte[imageStream.available()];
			while ((read = imageStream.read(imageByteArray, 0, imageByteArray.length)) != -1) {
				buffer.write(imageByteArray, 0, read);
			}
			buffer.flush();
			byte[] targetArray = buffer.toByteArray();
			imageStream.close();

			return new ResponseEntity<byte[]>(targetArray, HttpStatus.OK);
		} catch (Exception e) {
			log.info("[이미지로딩] Exception 발생");
			System.out.println(e);
			return null;
		}
	}
	
	//--------------------------------------------------------------------------------
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	@PutMapping("/shopupdate")
	public String shopupdate(
			HttpServletRequest request,
			@RequestParam(defaultValue = "0") Long shopSeq,
			@RequestParam(defaultValue = "") String shopName,
			@RequestParam(defaultValue = "") String locAddr,
			@RequestParam(defaultValue = "") String locLat, 
			@RequestParam(defaultValue = "") String locLon,
			@RequestParam(defaultValue = "") String shopAddrDetail,
			@RequestParam(defaultValue = "0") Long member,
			@RequestParam(defaultValue = "") String shopCategory,
			@RequestParam(defaultValue = "") String shopLogo,
			@RequestParam(defaultValue = "") List<String> shopImages,
			@RequestParam(defaultValue = "") String shopInfo,
			@RequestParam(defaultValue = "") String shopNotice,
			@RequestParam(defaultValue = "") String shopDetail,
			@RequestParam(defaultValue = "") String shopRegdate,
			@RequestParam(defaultValue = "") String shopStatus
			) {
		
		System.out.println("업데이트 들어옴");
//		/*
		System.out.println("shopSeq: "+shopSeq);
		System.out.println("shopName: "+shopName);
		System.out.println("locAddr: "+locAddr);
		System.out.println("locLat: "+locLat);
		System.out.println("locLon: "+locLon);
		System.out.println("shopAddrDetail: "+shopAddrDetail);
		System.out.println("member: "+member);
		System.out.println("shopCategory: "+shopCategory);
		System.out.println("shopLogo: "+shopLogo);
		System.out.println("shopImages: "+shopImages);
		System.out.println("shopInfo: "+shopInfo);
		System.out.println("shopNotice: "+shopNotice);
		System.out.println("shopDetail: "+shopDetail);
		System.out.println("shopRegdate: "+shopRegdate);
		System.out.println("shopStatus: "+shopStatus);
//		*/
		
		
		double d_locLat = Double.parseDouble(locLat);
		double d_locLon = Double.parseDouble(locLon);
		ShopCategory sc = ShopCategory.valueOf(shopCategory);
		MemberDTO memberDTO = memberRepository.findById(member).get();
		ShopStatus ss = ShopStatus.valueOf(shopStatus);
		//Timestamp sr = Timestamp.valueOf(shopRegdate.replace("T", " ").substring(0, 22));
		 //long=>timestamp 
		Timestamp sr = new Timestamp(Long.valueOf(shopRegdate));
		
		LocationDTO locationDTO = locationRepository.findById(locAddr).get();
		if(locationDTO ==null) {
				locationDTO =  LocationDTO.builder()
					.locAddr(locAddr).locLat(d_locLat).locLon(d_locLon)
					.build();
			locationRepository.save(locationDTO);
		}
		

		ShopDTO shopDTO = ShopDTO.builder()
				.shopSeq(shopSeq).shopName(shopName).location(locationDTO).shopAddrDetail(shopAddrDetail)
				.member(memberDTO)
				.shopCategory(sc)
				.shopLogo(shopLogo).shopImages(shopImages).shopInfo(shopInfo).shopNotice(shopNotice).shopDetail(shopDetail)
				.shopRegdate(sr).shopStatus(ss)
				.build();

		
		ShopDTO result = shopRepo.save(shopDTO);
		

		return 	(result==null||result.getShopSeq()==null)?"실패":"성공";		
	}

	
	@PutMapping("/shopdelete/{shopseq}")
	public String shopdelete(@PathVariable Long shopseq, HttpServletRequest request) {
		
		
		MemberDTO mem = (MemberDTO) request.getSession().getAttribute("member");
		if (mem == null) return "로그인 정보가 없습니다";
		if(mem.getMemType()== Memtype.일반회원) return "권한이 없습니다";
		
//		if(mem.getMemType()== Memtype.사업자회원 && )
		
		
		ShopDTO shop = shopRepo.findById(shopseq).get();

		
			
		shop.setShopStatus(ShopStatus.비활성);
		ShopDTO result = shopRepo.save(shop);
		
		System.out.println(shop);
		System.out.println(result);
		
		return 	(result==null||result.getShopSeq()==null)?"실패":"성공";
	}
}
