package com.example.CouponProject.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Random;

@Configuration
public class AppConfiguration {

    @Bean
    ModelMapper modelMapper(){
        return new ModelMapper();
    }

    @Bean
    Random random(){
        return new Random();
    }
}
