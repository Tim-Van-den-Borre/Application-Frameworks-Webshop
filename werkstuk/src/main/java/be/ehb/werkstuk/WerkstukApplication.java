package be.ehb.werkstuk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@SpringBootApplication
public class WerkstukApplication {

    public static void main(String[] args) {
        SpringApplication.run(WerkstukApplication.class, args);
    }


    // verwijzen naar de berichten / messages zelf.
    @Bean
    public MessageSource messageSource(){
        // zoeken naar een bepaalde resourcebundel -> de messages.
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();

        // meegeven waar de messages kunnen gevonden.
        messageSource.setBasename("classpath:messages/messages");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }

    @Bean
    public LocalValidatorFactoryBean getValidator(){
        // validator aanmaken die naar de constraints zal gaan kijken.
        LocalValidatorFactoryBean bean = new LocalValidatorFactoryBean();

        // de messages meegeven aan de validator zodat deze de messages ook kan gebruiken.
        bean.setValidationMessageSource(messageSource());
        return bean;
    }
}
