package com.idr.pdd.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.idr.pdd.common.ExcelFileType;
import com.idr.pdd.dto.FairPerformance;
import com.idr.pdd.dto.LogisticsPerformance;
import com.idr.pdd.dto.ProductInformation;
import com.idr.pdd.dto.WorkerPerformance;
import com.idr.pdd.service.FairPerformanceService;
import com.idr.pdd.service.LogisticsPerformanceService;
import com.idr.pdd.service.ProductInformationService;
import com.idr.pdd.service.WorkerPerformanceService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/simullator/productInformation")
public class ProductInformationController {
	private int totalRowCount = 0; // 전체 행 개수
	private int successRowCount = 0; // 성공한 데이터 개수
	private int failRowCount = 0; // 실패한 데이터 개수

	@Autowired
	private ProductInformationService service;

	@GetMapping("")
	public String init() {
		return "page/productInformation";
	}

	@ResponseBody
	@GetMapping("/find")
	public Map<String, Object> find(String search, int offset, int limit) {
		return service.find(search, offset, limit);
	}

	@Transactional
	@PostMapping(value = "/excelUpload")
	public void excelUpload(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value = "excelFile", required = true) MultipartFile file) {
		System.out.println(file);

		try {
			String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);

			if (!extension.equals("xlsx") && !extension.equals("xls")) {
				throw new IOException("엑셀파일만 업로드 해주세요.");
			}

			Workbook workbook = ExcelFileType.getWorkbook(file);

			Sheet sheet = workbook.getSheetAt(0);

			int rowIndex = 0;

			List<ProductInformation> list = new ArrayList<>();

			totalRowCount = sheet.getLastRowNum();

			for (rowIndex = 1; rowIndex < totalRowCount + 1; rowIndex++) {

				ProductInformation domain = new ProductInformation();

				int columnIndex = 0;
				Row row = sheet.getRow(rowIndex);

				for (columnIndex = 0; columnIndex < row.getLastCellNum(); columnIndex++) {

					Cell cell = row.getCell(columnIndex);
					String key = sheet.getRow(0).getCell(columnIndex).toString().replaceAll(" ", "").toUpperCase();

					if (cell != null) {
						if ("회사코드".equals(key)) {
							domain.setFactoryid(cell.toString());
						} else if ("회사명".equals(key)) {
							domain.setFactoryname(cell.toString());
						} else if ("ITEMID".equals(key)) {
							domain.setItemid(cell.toString());
						} else if ("ITEM이름".equals(key)) {
							domain.setItemname(cell.toString());
						} else if ("FLOWID".equals(key)) {
							domain.setFlowid(cell.toString());
						} else if ("FLOW이름".equals(key)) {
							domain.setFlowname(cell.toString());
						} else if ("공정순서".equals(key)) {
							domain.setProcessorder(cell.toString());
						} else if ("공정ID".equals(key)) {
							domain.setProcessid(cell.toString());
						} else if ("공정이름".equals(key)) {
							domain.setProcessname(cell.toString());
						} else if ("공정종류".equals(key)) {
							domain.setProcesstype(cell.toString());
						} else if ("연결FLOW".equals(key)) {
							domain.setConnectflow(cell.toString());
						} else if ("투입LOTID".equals(key)) {
							domain.setInputlotid(cell.toString());
						} else if ("투입LOTNAME".equals(key)) {
							domain.setInputlotname(cell.toString());
						} else if ("투입LOT크기".equals(key)) {
							domain.setInputlotsize(cell.toString());
						} else if ("투입LOT단위".equals(key)) {
							domain.setInputlotunit(cell.toString());
						} else if ("투입LOT수량".equals(key)) {
							domain.setInputlotnum((int) Double.parseDouble(cell.toString()));
						} else if ("생성LOTID".equals(key)) {
							domain.setCreatelotid(cell.toString());
						} else if ("생성LOT이름".equals(key)) {
							domain.setCreatelotname(cell.toString());
						} else if ("생성LOT크기".equals(key)) {
							domain.setCreatelotsize(cell.toString());
						} else if ("생성LOT단위".equals(key)) {
							domain.setCreatelotunit(cell.toString());
						} else if ("생성LOT수량".equals(key)) {
							domain.setCreatelotnum((int) Double.parseDouble(cell.toString()));
						} else if ("공정시간".equals(key)) {
							domain.setProcesstime(cell.toString());
						} else if ("장비이름".equals(key)) {
							domain.setEquipmentname(cell.toString());
						}
					}
				}

				list.add(domain);

			}
			if (list.size() > 0) {
				for (ProductInformation param : list) {
					service.create(param);
					successRowCount += 1;
				}
			}

			totalRowCount = 0;
			successRowCount = 0;

		} catch (

		Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			failRowCount += 1;
			totalRowCount = 0;
			successRowCount = 0;
		}
	};

	@ResponseBody
	@PostMapping(value = "/excelUploadPercent")
	public String excelUploadPercent() {
		double resultPerc = 0.0;
		resultPerc = ((double) successRowCount / (double) totalRowCount) * 100;

		if (Double.isNaN(resultPerc)) {
			return "0";
		} else {
			return String.format("%.0f", resultPerc);
		}
	}
}