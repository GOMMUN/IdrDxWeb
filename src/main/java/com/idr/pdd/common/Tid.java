package com.idr.pdd.common;

import java.util.Random;

public class Tid {

	public static String generate() {
		
		String tid = null;
		
		Random random = new Random();
		
		int first_leftLimit = 48; // numeral '0'
		int first_rightLimit = 122; // letter 'z'
		int first_targetStringLength = 8;
		
		String first_generate_str = random.ints(first_leftLimit,first_rightLimit + 1)
				  .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
				  .limit(first_targetStringLength)
				  .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
				  .toString();
	//// 
		int second_leftLimit = 48; // numeral '0'
		int second_rightLimit = 122; // letter 'z'
		int second_targetStringLength = 4;
		
		String second_generate_str = random.ints(second_leftLimit,second_rightLimit + 1)
				  .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
				  .limit(second_targetStringLength)
				  .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
				  .toString();
	//// 
		int third_leftLimit = 48; // numeral '0'
		int third_rightLimit = 122; // letter 'z'
		int third_targetStringLength = 4;
		
		String third_generate_str = random.ints(third_leftLimit,third_rightLimit + 1)
				  .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
				  .limit(third_targetStringLength)
				  .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
				  .toString();
	
	//// 
		int fourth_leftLimit = 48; // numeral '0'
		int fourth_rightLimit = 122; // letter 'z'
		int fourth_targetStringLength = 4;
		
		String fourth_generate_str = random.ints(fourth_leftLimit,fourth_rightLimit + 1)
				  .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
				  .limit(fourth_targetStringLength)
				  .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
				  .toString();
	//// 
		int last_leftLimit = 48; // numeral '0'
		int last_rightLimit = 122; // letter 'z'
		int last_targetStringLength = 12;
		
		String last_generate_str = random.ints(last_leftLimit,last_rightLimit + 1)
				  .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
				  .limit(last_targetStringLength)
				  .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
				  .toString();
	//// 
		
		tid = first_generate_str + "-" +
			  second_generate_str + "-" +
			  third_generate_str + "-" +
			  fourth_generate_str + "-" +
			  last_generate_str;
		
		return tid.toUpperCase();
	}
}
