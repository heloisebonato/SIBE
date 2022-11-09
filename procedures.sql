delete from sibe.locacao;

select * from sibe.locacao;

select * from sibe.carreta;

select * from sibe.cliente;

use sibe;


DELIMITER $$

DROP PROCEDURE IF EXISTS filterSearch  $$
CREATE PROCEDURE filterSearch(pesquisa text)
BEGIN

	
    IF EXISTS(SELECT * FROM sibe.cliente WHERE cpf = pesquisa OR nome = pesquisa)
    THEN
	SELECT * FROM sibe.cliente WHERE cpf = pesquisa OR nome = pesquisa;
	else
    SELECT * FROM sibe.carreta WHERE placa = pesquisa;
    END IF;

    
END$$

DELIMITER ;

call filterSearch('4545454');
call filterSearch('AA34D42');


DELIMITER $$

DROP PROCEDURE IF EXISTS historicoCliente  $$
CREATE PROCEDURE historicoCliente(cliente_id text)
BEGIN

	
    SELECT T1.locacao_id
    ,T1.data_entrada
    ,T1.data_prevista_entrada
    ,T1.data_saida 
    ,T1.data_prevista_saida 
    ,T1.preco_total
    ,T1.status
    ,TCarro.placa as placa_carro
    ,TCarreta.placa as placa_carreta
    ,TCliente.nome
            FROM locacao as T1 inner join carreta_locacao as T2 on T1.locacao_id = T2.locacao_id
            inner join carro_locacao as T3 on T1.locacao_id = T3.locacao_id
            inner join carro as TCarro on T3.carro_id = TCarro.carro_id
            inner join carreta as TCarreta on T2.carreta_id = TCarreta.carreta_id
            inner join Cliente as TCliente on TCliente.cliente_id = TCarro.cliente_id
	WHERE TCliente.cliente_id = cliente_id;

    
END$$

DELIMITER ;

call historicoCliente(4);

DELIMITER $$

DROP PROCEDURE IF EXISTS notificacao  $$
CREATE PROCEDURE notificacao()
BEGIN

	
    SELECT T1.locacao_id
    ,T1.data_entrada
    ,T1.data_prevista_entrada
    ,T1.data_saida 
    ,T1.data_prevista_saida 
    ,T1.preco_total
    ,T1.status
    ,CASE
		WHEN (date_format(str_to_date(data_prevista_entrada, '%Y-%m-%d'), '%Y-%m-%d') < CURDATE() AND data_entrada = "01/01/1900" AND data_saida = "01/01/1900") THEN "Atrasado Retirada"
		WHEN (date_format(str_to_date(data_prevista_saida, '%Y-%m-%d'), '%Y-%m-%d') < CURDATE() AND data_entrada = "01/01/1900") THEN "Atrasado Retorno"
		ELSE "Sem Atraso"
	END as status_agendamento
    ,TCarro.placa as placa_carro
    ,TCarreta.placa as placa_carreta
    ,TCliente.nome
            FROM locacao as T1 inner join carreta_locacao as T2 on T1.locacao_id = T2.locacao_id
            inner join carro_locacao as T3 on T1.locacao_id = T3.locacao_id
            inner join carro as TCarro on T3.carro_id = TCarro.carro_id
            inner join carreta as TCarreta on T2.carreta_id = TCarreta.carreta_id
            inner join Cliente as TCliente on TCliente.cliente_id = TCarro.cliente_id
	WHERE (date_format(str_to_date(data_prevista_entrada, '%Y-%m-%d'), '%Y-%m-%d') < CURDATE() AND data_entrada = "01/01/1900") OR
		  (date_format(str_to_date(data_prevista_saida, '%Y-%m-%d'), '%Y-%m-%d') < CURDATE() AND data_saida = "01/01/1900");

    
END$$

DELIMITER ;

call notificacao();

DELIMITER $$

DROP PROCEDURE IF EXISTS produtosAtivos  $$
CREATE PROCEDURE produtosAtivos()
BEGIN

	
    SELECT T1.locacao_id
    ,T1.data_entrada
    ,T1.data_prevista_entrada
    ,T1.data_saida 
    ,T1.data_prevista_saida 
    ,T1.preco_total
    ,T1.status
    ,TCarro.placa as placa_carro
    ,TCarreta.placa as placa_carreta
    ,TCliente.nome
            FROM locacao as T1 inner join carreta_locacao as T2 on T1.locacao_id = T2.locacao_id
            inner join carro_locacao as T3 on T1.locacao_id = T3.locacao_id
            inner join carro as TCarro on T3.carro_id = TCarro.carro_id
            inner join carreta as TCarreta on T2.carreta_id = TCarreta.carreta_id
            inner join Cliente as TCliente on TCliente.cliente_id = TCarro.cliente_id
	WHERE T1.status = 'Operante';

    
END$$

DELIMITER ;


DELIMITER $$

DROP PROCEDURE IF EXISTS countCarretas  $$
CREATE PROCEDURE countCarretas()
BEGIN

	
    SELECT
    TCarreta.placa as placa_carreta
    ,COUNT(T1.locacao_id) contagem_loc
            FROM locacao as T1 inner join carreta_locacao as T2 on T1.locacao_id = T2.locacao_id
            inner join carro_locacao as T3 on T1.locacao_id = T3.locacao_id
            inner join carro as TCarro on T3.carro_id = TCarro.carro_id
            inner join carreta as TCarreta on T2.carreta_id = TCarreta.carreta_id
            inner join Cliente as TCliente on TCliente.cliente_id = TCarro.cliente_id
	group by TCarreta.placa;

    
END$$

DELIMITER ;