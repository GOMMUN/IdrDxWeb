package com.idr.pdd.common;

import java.io.IOException;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

public class ExcelFileType {

	public static Workbook getWorkbook(MultipartFile file) {
		
		Workbook workbook = null;
		
		try {
			String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1).toUpperCase();
			
			if (!extension.equals("XLSX") && !extension.equals("XLS")) {
		      throw new IOException("엑셀파일만 업로드 해주세요.");
		    }
			
			if (extension.equals("XLSX")) {
		      workbook = new XSSFWorkbook(file.getInputStream());
		    } else if (extension.equals("XLS")) {
		      workbook = new HSSFWorkbook(file.getInputStream());
		    }
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		return workbook;
	}
}
