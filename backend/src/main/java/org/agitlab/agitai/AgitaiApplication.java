package org.agitlab.agitai;

import org.agitlab.agitai.workspace.WorkspaceRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class AgitaiApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgitaiApplication.class, args);
	}

}
