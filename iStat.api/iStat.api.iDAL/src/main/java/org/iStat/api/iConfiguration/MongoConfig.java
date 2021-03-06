package org.iStat.api.iConfiguration;

import org.iStat.api.iManage.ManageDocumentiStat;
import org.iStat.api.iRepository.DatasetRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackageClasses = { DatasetRepository.class })
public class MongoConfig {

    @Bean
    public ManageDocumentiStat manageDocumentIStat() {
        return new ManageDocumentiStat();
    }
}
